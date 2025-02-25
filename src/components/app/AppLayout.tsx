'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import SkeletonLoader from '../cards/SkeletonLoader'
import ProtectedLayout from '@/components/layout.tsx/ProtectedLayout'
import { useAppSelector } from '@/store/hooks'
import Loading from '../cards/loading'
import Error from '../cards/error'

interface AppLayoutProps {
    children: React.ReactNode
    isLoading?: boolean
}

export default function AppLayout({
    children,
    isLoading = false,
}: AppLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { appState } = useAppSelector(state => state.appState)

    return appState === 'isLoading' ? (
        <Loading />
    ) : appState === 'isError' ? (
        <Error />
    ) : (
        <ProtectedLayout>
            <div className="flex h-screen bg-complement p-2 gap-4">
                {/* Sidebar */}
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                <div className="flex flex-col flex-1 overflow-hidden">
                    {/* Header */}
                    <Header
                        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    />

                    {/* Main Content */}
                    <main className="flex-1 overflow-y-auto text-white mt-2">
                        {isLoading ? <SkeletonLoader /> : children}
                    </main>
                </div>
            </div>
        </ProtectedLayout>
    )
}
