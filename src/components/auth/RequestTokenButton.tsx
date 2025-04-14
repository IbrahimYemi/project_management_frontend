'use client'

import { appStorage } from '@/lib/generic.fn'
import { useState, useEffect } from 'react'

type RequestTokenButtonProps = {
    email: string
    authMethod: 'password' | 'token' | null
    onRequest: (email: string) => void
    isLoading: boolean
}

export function RequestTokenButton({
    email,
    authMethod,
    onRequest,
    isLoading,
}: RequestTokenButtonProps) {
    const [countdown, setCountdown] = useState(0)

    useEffect(() => {
        const storedExpiration = appStorage.retrieve('tokenCountdown')
        if (storedExpiration) {
            const remainingTime = Math.max(
                Math.floor((parseInt(storedExpiration) - Date.now()) / 1000),
                0,
            )
            setCountdown(remainingTime)
        }
    }, [])

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000)
        }
        return () => clearTimeout(timer)
    }, [countdown])

    const handleRequest = () => {
        if (countdown === 0) {
            onRequest(email)
            const expirationTime = Date.now() + 180 * 1000 // 3 minutes from now
            appStorage.persist('tokenCountdown', expirationTime.toString())
            setCountdown(180)
        }
    }

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${minutes}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <button
            type="button"
            disabled={isLoading || countdown > 0}
            className={`p-2 py-1 rounded-md text-sm text-nowrap font-medium transition-all ${
                authMethod !== 'token' && 'hidden'
            } ${
                countdown > 0
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
            onClick={handleRequest}
        >
            {isLoading
                ? 'Requesting...'
                : countdown > 0
                  ? `Retry in ${formatTime(countdown)}`
                  : 'Request Token'}
        </button>
    )
}
