'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/store/hooks'
import { STORAGE_KEYS } from '@/store/constants'
import { appStorage } from '@/lib/generic.fn'

export const useRedirectIfAuthenticated = () => {
    const router = useRouter()
    const [checking, setChecking] = useState(true)
    const { isAuthenticated } = useAppSelector(state => state.auth)
    const token = appStorage.retrieve(STORAGE_KEYS.AUTH_TOKEN)

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
