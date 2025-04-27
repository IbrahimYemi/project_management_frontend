'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { NotificationType } from '@/types/notification'
import {
    CheckCircle,
    Bell,
    MessageCircle,
    CheckSquare,
    FolderKanban,
} from 'lucide-react'
import { useNotificationActions } from '@/hooks/notifications/useNotificationActions'
import { useAppDispatch } from '@/store/hooks'
import { setAppState } from '@/store/slices/appStateSlice'

type NotificationsProps = {
    notifications: NotificationType[]
    isNotificationLoading: boolean
    isNotificationError: boolean
}

export default function Notifications({
    notifications,
    isNotificationError,
    isNotificationLoading,
}: NotificationsProps) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const isOpen = searchParams.get('notifications') === 'true'
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    const dispatch = useAppDispatch()

    const { markAllNotificationsAsRead, markNotificationAsRead } =
        useNotificationActions()

    const [readNotifications, setReadNotifications] = useState<
        Record<string, boolean>
    >({})

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                router.push('?')
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen, router])

    const toggleRead = async (id: string) => {
        if (id === null) {
            return
        }
        setReadNotifications(prev => ({ ...prev, [id]: !prev[id] }))
        dispatch(setAppState('isRequesting'))
        await markNotificationAsRead(id)
    }

    const markAllAsRead = async () => {
        if (notifications.length === 0) {
            return
        }
        const allRead = notifications.reduce(
            (acc, notification) => {
                acc[notification?.id] = true
                return acc
            },
            {} as Record<string, boolean>,
        )
        setReadNotifications(allRead)
        dispatch(setAppState('isRequesting'))
        await markAllNotificationsAsRead()
    }

    const handleNotificationClick = (notification: NotificationType) => {
        const routes: Record<string, string> = {
            discussion: `/tasks/${notification?.dataId}?tab=discussions`,
            task: `/tasks/${notification?.dataId}`,
            project: `/projects/${notification?.dataId}`,
            meeting: `${notification?.dataId}`,
            other: '?',
        }

        const url = routes[notification?.type] || '/'

        if (notification?.type === 'meeting') {
            // Open in a new tab
            window.open(url, '_blank')
        } else {
            // Navigate within the same tab for scroll to work
            router.push(url)
        }
    }

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'discussion':
                return <MessageCircle className="w-5 h-5 text-blue-500" />
            case 'task':
                return <CheckSquare className="w-5 h-5 text-green-500" />
            case 'project':
                return <FolderKanban className="w-5 h-5 text-purple-500" />
            default:
                return <Bell className="w-5 h-5 text-gray-500" />
        }
    }

    if (!isOpen) return null

    return (
        <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-96 bg-white border rounded-lg shadow-lg p-4 max-h-80 overflow-auto z-50 text-gray-800"
        >
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Bell className="w-5 h-5 text-brand" /> Notifications
                </h3>
                <button
                    onClick={markAllAsRead}
                    className="text-sm hover:underline"
                >
                    Mark All as Read
                </button>
            </div>

            {isNotificationLoading && (
                <p className="text-gray-500 text-sm">Loading...</p>
            )}
            {isNotificationError && (
                <p className="text-red-500 text-sm">
                    Failed to load notifications
                </p>
            )}

            {!isNotificationLoading &&
            !isNotificationError &&
            notifications.length > 0 ? (
                <div className="space-y-2">
                    {notifications.map(notification => (
                        <div
                            key={notification?.id}
                            className={`flex items-center gap-3 p-3 border rounded-lg shadow-sm transition cursor-pointer ${
                                readNotifications[notification?.id]
                                    ? 'bg-gray-200'
                                    : 'hover:bg-gray-100'
                            }`}
                            onClick={() =>
                                handleNotificationClick(notification)
                            }
                        >
                            {getNotificationIcon(notification?.type)}
                            <input
                                type="checkbox"
                                checked={!!readNotifications[notification?.id]}
                                onChange={e => {
                                    e.stopPropagation()
                                    toggleRead(notification?.id)
                                }}
                                className="w-4 h-4"
                            />
                            <div className="flex-1">
                                <p
                                    className={`text-sm ${
                                        readNotifications[notification?.id]
                                            ? 'text-gray-500'
                                            : 'font-medium'
                                    }`}
                                >
                                    {notification?.message}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {notification?.type.toUpperCase()}
                                </p>
                            </div>
                            {readNotifications[notification?.id] && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                !isNotificationLoading && (
                    <p className="text-gray-500 text-sm">
                        No new notifications
                    </p>
                )
            )}
        </div>
    )
}
