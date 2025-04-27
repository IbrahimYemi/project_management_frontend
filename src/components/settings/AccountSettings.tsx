import { useUserActions } from '@/hooks/users/useUserActions'
import Avatar from '../ui/Avatar'
import { User } from '@/types/authTypes'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setAppState } from '@/store/slices/appStateSlice'
import { UserActionsType } from '@/types/users'
import {
    LockKeyhole,
    LockKeyholeOpenIcon,
    Trash,
    User2,
    UserPen,
    UserPlus,
} from 'lucide-react'

export default function AccountSettings({
    user,
    styles = 'flex justify-center items-center min-h-[65vh]',
}: {
    user?: User
    styles?: string
}) {
    const { user: authUser } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const { restrictUser, activateUser, deleteUser, changeUserRole } =
        useUserActions()
    const currentRole = user?.app_role?.toLowerCase()
    const handleUserActions = (type: UserActionsType, id: string) => {
        dispatch(setAppState('isRequesting'))
        if (type === 'restrict') {
            restrictUser(id)
        } else if (type === 'activate') {
            activateUser(id)
        } else if (type === 'make-admin') {
            changeUserRole({ id, type })
        } else if (type === 'make-teamlead') {
            changeUserRole({ id, type })
        } else if (type === 'make-member') {
            changeUserRole({ id, type })
        } else {
            deleteUser(id)
        }
    }
    return (
        <div className={styles}>
            <div className="bg-gray-800 shadow-lg rounded-2xl p-2 md:p-6 max-w-96 w-full relative">
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
                                ? new Date(
                                      user?.created_at ?? '',
                                  ).toLocaleDateString()
                                : 'N/A'}
                        </span>
                    </div>
                </div>
                {/* actions buttons */}
                {authUser?.id !== user?.id && (
                    <div className="flex gap-2 mt-5">
                        {currentRole !== 'super admin' &&
                            currentRole !== 'admin' && (
                                <button
                                    className="px-2 py-1 text-xs bg-blue-600 text-white rounded"
                                    onClick={() =>
                                        handleUserActions(
                                            'make-admin',
                                            user?.id ?? '',
                                        )
                                    }
                                    title="Make Admin"
                                >
                                    <UserPlus />
                                </button>
                            )}
                        {currentRole !== 'super admin' &&
                            currentRole !== 'teamlead' && (
                                <button
                                    className="px-2 py-1 text-xs bg-indigo-600 text-white rounded"
                                    onClick={() =>
                                        handleUserActions(
                                            'make-teamlead',
                                            user?.id ?? '',
                                        )
                                    }
                                    title="Make Team Lead"
                                >
                                    <UserPen />
                                </button>
                            )}
                        {currentRole !== 'super admin' &&
                            currentRole !== 'member' && (
                                <button
                                    className="px-2 py-1 text-xs bg-gray-700 text-white rounded"
                                    onClick={() =>
                                        handleUserActions(
                                            'make-member',
                                            user?.id ?? '',
                                        )
                                    }
                                    title="Make Member"
                                >
                                    <User2 />
                                </button>
                            )}
                        <button
                            title="restrict"
                            role="Restrict user"
                            className={`px-3 py-1 text-sm bg-yellow-500 text-white rounded disabled:opacity-50`}
                            onClick={() =>
                                handleUserActions('restrict', user?.id ?? '')
                            }
                            disabled={!user?.isActive}
                        >
                            <LockKeyhole />
                        </button>
                        <button
                            title="activate"
                            role="Activate user"
                            className={`px-3 py-1 text-sm bg-green-500 text-white rounded disabled:opacity-50`}
                            onClick={() =>
                                handleUserActions('activate', user?.id ?? '')
                            }
                            disabled={user?.isActive}
                        >
                            <LockKeyholeOpenIcon />
                        </button>
                        <button
                            title="Delete"
                            role="Delete user"
                            className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                            onClick={() =>
                                handleUserActions('delete', user?.id ?? '')
                            }
                        >
                            <Trash />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
