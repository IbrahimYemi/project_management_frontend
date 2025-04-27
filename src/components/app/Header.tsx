'use client'

import { useAppSelector } from '@/store/hooks'
import { AlignLeft, Bell } from 'lucide-react'
import Avatar from '../ui/Avatar'
import Breadcrumbs from '../ui/Breadcrumbs'
import { useRouter, useSearchParams } from 'next/navigation'
import Notifications from './Notifications'
import { NotificationType } from '@/types/notification'

type HeaderProps = {
    onToggleSidebar: () => void
    notifications: NotificationType[]
    isNotificationLoading: boolean
    isNotificationError: boolean
}

export default function Header({
    onToggleSidebar,
    isNotificationError,
    isNotificationLoading,
    notifications,
}: HeaderProps) {
    const { user } = useAppSelector(state => state.auth)
    const router = useRouter()
    const searchParams = useSearchParams()
    const isNotificationsOpen = searchParams.get('notifications') === 'true'

    const toggleNotifications = () => {
        if (isNotificationsOpen) {
            router.push('?', undefined)
        } else {
            router.push('?notifications=true', undefined)
        }
    }

    return (
        <header className="bg-white z-[4500] shadow-md p-2 md:px-6 md:py-4 flex items-center justify-between rounded-md relative">
            {/* Left Side: Sidebar Toggle & Breadcrumb */}
            <div className="flex items-center gap-4">
                <button
                    className="md:hidden text-baseColor"
                    onClick={onToggleSidebar}>
                    <AlignLeft className="w-6 h-6" />
                </button>
                <Breadcrumbs />
            </div>

            {/* Right Side: Icons & User Profile */}
            <div className="flex items-center gap-5 relative">
                {/* Notifications */}
                <div className="relative">
                    <button
                        className="relative text-baseColor md:inline-block hidden"
                        onClick={toggleNotifications}>
                        <Bell className="w-6 h-6" />
                        <span className="absolute -top-1 -right-1 text-white bg-emerald-600 text-red text-xs rounded-full px-1">
                            {notifications?.length || 0}
                        </span>
                    </button>

                    {/* Notifications Dropdown */}
                    <Notifications
                        notifications={notifications}
                        isNotificationError={isNotificationError}
                        isNotificationLoading={isNotificationLoading}
                    />
                </div>

                {/* User Info */}
                <div className="flex items-center gap-2">
                    <div className="md:inline-block hidden">
                        <h2 className="font-medium text-titleText truncate">
                            {user?.name}
                        </h2>
                        <p className="text-xs text-gray-600">
                            {user?.role || 'User'}
                        </p>
                    </div>
                    <Avatar showOverlay={false} size={35} />
                </div>
            </div>
        </header>
    )
}
