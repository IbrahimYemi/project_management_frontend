'use client'

import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import SkeletonLoader from '../cards/SkeletonLoader'
import ProtectedLayout from '@/components/layouts/ProtectedLayout'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import Loading from '../cards/loading'
import ErrorPage from '../cards/ErrorPage'
import FormWrapper from './FormWrapper'
import { useRouter } from 'next/navigation'
import { FormDispatchedTypes } from '@/types/generic'
import { setFormDispatcher } from '@/store/slices/formDispatcherSlice'
import BottomLeftLoader from '../ui/BottomLeftLoader'
import { useNotifications } from '@/hooks/notifications/useNotifications'

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
    const router = useRouter()
    const dispatch = useAppDispatch()

    const {
        data: notifications = [],
        isLoading: isNotificationLoading,
        isError: isNotificationError,
    } = useNotifications(true)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const formType = params.get('form-active-state') as FormDispatchedTypes

        if (formType) {
            dispatch(setFormDispatcher(formType))
        }
    }, [dispatch, router])

    return appState === 'isLoading' ? (
        <Loading />
    ) : appState === 'isError' ? (
        <ErrorPage />
    ) : (
        <ProtectedLayout>
            <div className="flex h-screen bg-complement p-2 gap-4">
                {/* Sidebar */}
                <Sidebar
                    notificationCount={notifications.length ?? 0}
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                <div className="flex flex-col flex-1 overflow-hidden">
                    {/* Header */}
                    <Header
                        notifications={notifications}
                        isNotificationLoading={isNotificationLoading}
                        isNotificationError={isNotificationError}
                        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    />

                    {/* Main Content */}
                    <main className="flex-1 overflow-y-auto text-white mt-2">
                        {isLoading ? <SkeletonLoader /> : children}
                    </main>
                </div>

                {/* Show loader if appState is 'isRequesting' */}
                {appState === 'isRequesting' && <BottomLeftLoader />}
            </div>

            {/* Display the active form */}
            <FormWrapper />
        </ProtectedLayout>
    )
}
