'use client'

import React, { useState, useRef, useEffect } from 'react'
import Avatar from '../ui/Avatar'
import { User } from '@/types/authTypes'
import {
    ChevronDown,
    ChevronUp,
    Bell,
    User as UserIcon,
    LogOut,
    Settings,
} from 'lucide-react'
import { useLogout } from '@/hooks/auth/useLogout'
import { useAppDispatch } from '@/store/hooks'
import { setAppState } from '@/store/slices/appStateSlice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function UserDetails({
    authUser,
    notificationCount,
}: {
    authUser: User | null
    notificationCount: number
}) {
    const { logout, isPending } = useLogout()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const handleLogout = () => {
        logout()
    }

    useEffect(() => {
        // Close the dropdown if clicking outside
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        if (isPending) {
            dispatch(setAppState('isLoading'))
        }
    }, [dispatch, isPending])

    return (
        <div className="relative flex items-center justify-between my-3 w-full px-4">
            <div className="flex items-center gap-2">
                <Avatar size={30} />
                <div className="">
                    <h2 className="font-semibold text-xs text-brand">
                        {authUser?.name}
                    </h2>
                    <h4 className="text-[10px] text-titleText italic">
                        {authUser?.role}
                    </h4>
                </div>
            </div>

            {/* Dropdown Toggle Button */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-titleText rounded-md flex flex-col text-baseText"
                >
                    <ChevronUp className="p-0.5 size-4" />
                    <ChevronDown className="p-0.5 size-4" />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div
                        className="absolute right-0 w-48 bg-baseColor shadow-md rounded-md border z-50
                        md:w-52 md:p-1 md:shadow-md md:mb-0 mb-3 bottom-[100%] md:bottom-[50%] md:left-[100%]"
                    >
                        <ul className="space-y-2 border border-complement rounded-md p-2 inset-0">
                            {/* Account */}
                            <li>
                                <Link
                                    href="/settings?tab=account"
                                    className="flex items-center gap-2 p-2 hover:bg-baseText hover:text-baseColor cursor-pointer rounded"
                                >
                                    <UserIcon
                                        size={16}
                                        className="text-gray-600"
                                    />
                                    <span className="text-sm">Account</span>
                                </Link>
                            </li>

                            {/* Notifications */}
                            <li
                                onClick={() =>
                                    router.push(
                                        '?notifications=true',
                                        undefined,
                                    )
                                }
                                className="flex items-center gap-2 p-2 hover:bg-baseText hover:text-baseColor cursor-pointer rounded-md relative"
                            >
                                <Bell size={16} className="text-gray-600" />
                                <span className="text-sm">Notifications</span>
                                <span className="absolute right-3 top-1 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                                    {notificationCount}
                                </span>
                            </li>

                            {/* Settings */}
                            <li>
                                <Link
                                    href="/settings?tab=profile"
                                    className="flex items-center gap-2 p-2 hover:bg-baseText hover:text-baseColor cursor-pointer rounded"
                                >
                                    <Settings
                                        size={16}
                                        className="text-gray-600"
                                    />
                                    <span className="text-sm">Settings</span>
                                </Link>
                            </li>

                            {/* Logout */}
                            <li
                                onClick={() => handleLogout()}
                                className="flex items-center gap-2 p-2 cursor-pointer rounded-md text-red-600"
                            >
                                <LogOut size={16} />
                                <span className="text-sm">Logout</span>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}
