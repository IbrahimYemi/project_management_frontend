'use client'

import { useAppSelector } from '@/store/hooks'
import { AlignLeft, Bell, Search, PlusCircle } from 'lucide-react'
import Avatar from '../ui/Avatar'
import { useState } from 'react'
import Breadcrumbs from '../ui/Breadcrumbs'

interface HeaderProps {
    onToggleSidebar: () => void
}

export default function Header({ onToggleSidebar }: HeaderProps) {
    const { user } = useAppSelector(state => state.auth)
    const [isDropdownOpen, setDropdownOpen] = useState(false)

    return (
        <header className="bg-white z-[4500] shadow-md p-2 md:px-6 md:py-4 flex items-center justify-between rounded-md">
            {/* Left Side: Sidebar Toggle & Breadcrumb */}
            <div className="flex items-center gap-4">
                <button
                    className="md:hidden text-baseColor"
                    onClick={onToggleSidebar}
                >
                    <AlignLeft className="w-6 h-6" />
                </button>
                <Breadcrumbs />
            </div>

            {/* Center: Search Bar */}
            <div className="hidden md:flex items-center bg-complement rounded-xl px-4 py-2 w-1/3">
                <Search className="w-5 h-5 text-baseText" />
                <input
                    type="text"
                    placeholder="Search projects, tasks..."
                    className="bg-transparent outline-none px-2 text-baseText w-full"
                />
            </div>

            {/* Right Side: Icons & User Profile */}
            <div className="flex items-center gap-5 relative">
                {/* Dark Mode Toggle */}

                {/* Quick Actions Dropdown - FIXED */}
                <div className="relative md:inline-block hidden">
                    <button
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                        className="text-baseColor"
                    >
                        <PlusCircle className="w-6 h-6" />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 bg-white shadow-md border rounded-lg w-40 p-2">
                            <div
                                className="block px-4 py-2 text-sm text-baseColor hover:bg-complement cursor-pointer"
                                onClick={() => setDropdownOpen(false)}
                            >
                                + New Task
                            </div>
                            <div
                                className="block px-4 py-2 text-sm text-baseColor hover:bg-complement cursor-pointer"
                                onClick={() => setDropdownOpen(false)}
                            >
                                + New Project
                            </div>
                        </div>
                    )}
                </div>

                {/* Notifications */}
                <button className="relative text-baseColor md:inline-block hidden">
                    <Bell className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 bg-brand text-red text-xs rounded-full px-1">
                        3
                    </span>
                </button>

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
                    <Avatar size={35} />
                </div>
            </div>
        </header>
    )
}
