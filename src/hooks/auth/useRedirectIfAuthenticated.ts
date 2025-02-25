'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/store/hooks'
import { AUTH_TOKEN_STORAGE_KEY } from '@/store/constants'
import { appStorage } from '@/lib/generic.fn'

export const useRedirectIfAuthenticated = () => {
    const router = useRouter()
    const [checking, setChecking] = useState(true)
    const { isAuthenticated } = useAppSelector(state => state.auth)
    const token = appStorage.retrieve(AUTH_TOKEN_STORAGE_KEY)

    useEffect(() => {
        if (isAuthenticated) {
            router.replace('/dashboard')
        }

        if (token) {
            router.replace('/dashboard')
        }

        setChecking(false)
    }, [isAuthenticated, router, token])

    return checking
}
