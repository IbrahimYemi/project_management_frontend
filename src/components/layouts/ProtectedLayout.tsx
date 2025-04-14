'use client'

import { RootState } from '@/store/store'
import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import Loading from '../cards/loading'
import { useAuthHydration } from '@/hooks/auth/useAuthHydration'

type ProtectedLayoutProps = {
    children: ReactNode
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth)

    useAuthHydration()

    if (!isAuthenticated) {
        return <Loading />
    }

    return <div className="relative">{children}</div>
}
