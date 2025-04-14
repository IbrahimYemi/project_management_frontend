'use client'

import { ReactNode } from 'react'
import { useAppSelector } from '@/store/hooks'
import { useRedirectIfAuthenticated } from '@/hooks/auth/useRedirectIfAuthenticated'
import Loading from '../cards/loading'

interface GuestLayoutProps {
    children: ReactNode
}

export default function GuestLayout({ children }: GuestLayoutProps) {
    const { isAuthenticated } = useAppSelector(state => state.auth)
    const isCheckingAuth = useRedirectIfAuthenticated()

    if (isCheckingAuth) {
        return <Loading />
    }

    if (isAuthenticated) {
        return <Loading />
    }

    return <>{children}</>
}
