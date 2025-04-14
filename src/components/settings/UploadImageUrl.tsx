import { useUserActions } from '@/hooks/users/useUserActions'
import { useAppSelector } from '@/store/hooks'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function UploadImageUrl({
    setIsImageModalOpen,
}: {
    setIsImageModalOpen: (isOpen: boolean) => void
}) {
    const { user: authUser } = useAppSelector(state => state.auth)
    const [imageUrl, setImageUrl] = useState('')
    const [username, setUsername] = useState('')
    const {
        updateUserAvatar,
        isUpdateUserAvatarLoading,
        isUpdateUserAvatarSuccess,
    } = useUserActions()

    const handleImageSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!username) {
            toast.error('Name field is required')
            return
        }

        await updateUserAvatar({
            avatar: imageUrl,
            name: username,
        })
    }

    useEffect(() => {
        if (authUser) {
            setUsername(authUser.name || '')
            setImageUrl(authUser.avatar || '')
        }
    }, [authUser])

    useEffect(() => {
        if (isUpdateUserAvatarSuccess) {
            setIsImageModalOpen(false)
        }
    }, [isUpdateUserAvatarSuccess, setIsImageModalOpen])

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[5000]">
            <div className="bg-gray-900 rounded-2xl p-6 w-80 shadow-lg">
                <h2 className="text-lg font-semibold text-gray-300 mb-4">
                    Upload Details
                </h2>
                <form onSubmit={handleImageSubmit} className="space-y-4">
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-gray-100 bg-gray-700"
                        placeholder="Enter your full name"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        type="url"
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-gray-100 bg-gray-700"
                        placeholder="Enter image URL"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                    />
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => setIsImageModalOpen(false)}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                        >
                            {isUpdateUserAvatarLoading
                                ? 'Uploading..'
                                : 'Upload'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
