import React from 'react'
import { useAppSelector } from '@/store/hooks'
import Avatar from '../ui/Avatar'

export default function AccountSettings() {
    const { user } = useAppSelector(state => state.auth)

    return (
        <div className="flex justify-center items-center min-h-[65vh]">
            <div className="bg-gray-800 shadow-lg rounded-2xl p-6 w-96">
                <div className="flex flex-col items-center">
                    <Avatar
                        userImage={user?.avatar}
                        username={user?.name}
                        size={70}
                    />
                    <h2 className="mt-4 text-xl font-semibold text-gray-200">
                        {user?.name}
                    </h2>
                    <p className="text-gray-300 text-sm">{user?.email}</p>
                    <span
                        className={`mt-2 text-xs px-3 py-1 rounded-full font-semibold ${
                            user?.isActive
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                        }`}
                    >
                        {user?.isActive ? 'Active' : 'Inactive'}
                    </span>
                </div>
                <div className="mt-5 space-y-2">
                    <div className="flex justify-between text-gray-500">
                        <span className="font-semibold">Role:</span>
                        <span className="text-sm bg-gray-200 px-3 py-1 rounded-md">
                            {user?.role || 'N/A'}
                        </span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                        <span className="font-semibold">App Role:</span>
                        <span className="text-sm bg-gray-200 px-3 py-1 rounded-md">
                            {user?.app_role || 'N/A'}
                        </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span className="font-semibold">Joined:</span>
                        <span className="text-sm">
                            {user?.created_at
                                ? new Date(user.created_at).toLocaleDateString()
                                : 'N/A'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
