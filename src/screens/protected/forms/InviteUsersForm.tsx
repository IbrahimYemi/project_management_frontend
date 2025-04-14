'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { InviteUserParam } from '@/types/users'
import { useUserInvite } from '@/hooks/users/useUserInvite'
import { validateEmail } from '@/lib/fn/emailValidator'
import { Loader } from 'lucide-react'

type InviteUsersFormProps = {
    onCloseForm: () => void
}

export default function InviteUsersForm({ onCloseForm }: InviteUsersFormProps) {
    const { inviteUser, isInviteLoading, isInviteSuccess } = useUserInvite()

    const [formData, setFormData] = useState<InviteUserParam>({
        email: '',
        name: '',
    })

    useEffect(() => {
        if (isInviteSuccess) {
            onCloseForm()
        }
    }, [isInviteSuccess, onCloseForm])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.email || !formData.name) {
            toast.error('Please fill in all fields')
            return
        }

        if (!validateEmail(formData.email)) {
            toast.error('Invalid email format')
            return
        }

        try {
            await inviteUser(formData)
        } catch {
            toast.error('Failed to invite user')
        }
    }

    return (
        <div className="p-6 bg-baseColor text-gray-200 rounded-lg shadow-lg w-96 max-w-full animate-fadeIn">
            {/* Header */}
            <h2 className="text-xl font-semibold text-gray-200 mb-4">
                Invite User
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                    <label className="block text-sm font-medium text-gray4800">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none text-gray-100 bg-gray-700"
                        placeholder="Enter name"
                        required
                    />
                </div>

                {/* Email Field */}
                <div>
                    <label className="block text-sm font-medium text-gray4800">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none text-gray-100 bg-gray-700"
                        placeholder="Enter email"
                        required
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-400 transition"
                        onClick={onCloseForm}
                        disabled={isInviteLoading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg transition flex items-center"
                        disabled={isInviteLoading}
                    >
                        {isInviteLoading ? (
                            <Loader className="animate-spin" />
                        ) : null}
                        {isInviteLoading ? 'Inviting...' : 'Invite'}
                    </button>
                </div>
            </form>
        </div>
    )
}
