import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/store/hooks'
import Avatar from '../ui/Avatar'
import { toast } from 'react-toastify'
import { useUserPassword } from '@/hooks/users/useUserPassword'
import { EditIcon } from 'lucide-react'
import UploadImageUrl from './UploadImageUrl'

export default function ProfileSettings() {
    const { user } = useAppSelector(state => state.auth)

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isImageModalOpen, setIsImageModalOpen] = useState(false)

    const {
        updatePassword,
        isPasswordLoading: loading,
        isPasswordSuccess,
    } = useUserPassword()

    useEffect(() => {
        if (isPasswordSuccess) {
            setOldPassword('')
            setPassword('')
            setConfirmPassword('')
        }
    }, [isPasswordSuccess])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!password || password.length < 6) {
            toast.error('Password must be at least 6 characters long.')
            return
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match.')
            return
        }

        updatePassword({
            old_password: oldPassword,
            password,
            password_confirmation: confirmPassword,
        })
    }

    return (
        <div className="flex justify-center items-center min-h-[85vh] relative">
            {/* Image Modal */}
            {isImageModalOpen && (
                <UploadImageUrl setIsImageModalOpen={setIsImageModalOpen} />
            )}

            <div className="bg-gray-800 shadow-lg rounded-2xl p-6 w-96">
                <h2 className="text-xl font-semibold text-gray-200 text-center mb-4">
                    Profile Settings
                </h2>
                <div className="flex flex-col items-center mb-4">
                    <div className="relative">
                        <Avatar
                            userImage={user?.avatar}
                            username={user?.name}
                            size={70}
                        />
                        <button
                            onClick={() => setIsImageModalOpen(true)}
                            title="Change Details"
                            className="absolute bottom-2 right-2 text-sm text-emerald-400 hover:underline"
                        >
                            <EditIcon className="w-4 h-4" />
                        </button>
                    </div>
                    <h3 className="mt-3 text-lg font-medium text-gray-200">
                        {user?.name}
                    </h3>
                    <p className="text-gray-300 text-sm">{user?.email}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Old Password
                        </label>
                        <input
                            type="password"
                            className="w-full text-baseColor px-3 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                            placeholder="Enter old password"
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            New Password
                        </label>
                        <input
                            type="password"
                            className="w-full text-baseColor px-3 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                            placeholder="Enter new password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="w-full text-baseColor px-3 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition disabled:bg-gray-400"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    )
}
