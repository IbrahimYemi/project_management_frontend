import React from 'react'
import { AlertTriangle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { setAppState } from '@/store/slices/appStateSlice'
import { useAppDispatch } from '@/store/hooks'
import AppLayout from '../app/AppLayout'
import { AUTH_TOKEN_STORAGE_KEY } from '@/store/constants'
import { appStorage } from '@/lib/generic.fn'

interface ErrorProps {
    error?: string | { message: string }
}

export default function Error({ error }: ErrorProps) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const token = appStorage.retrieve(AUTH_TOKEN_STORAGE_KEY)

    const handleGoHome = () => {
        dispatch(setAppState('isIdle'))
        // go to dashboard
        router.push('/dashboard')
    }

    const handleReload = () => {
        dispatch(setAppState('isIdle'))
        // reload the app
        window.location.reload()
    }

    // Check if error is a string or an object with a message
    const errorMessage =
        typeof error === 'string'
            ? error
            : error?.message || 'An unknown error occurred'

    const errorComponent = () => {
        return (
            <div className="flex justify-center items-center min-h-screen bg-baseColor">
                <div className="text-center bg-complement p-8 rounded-lg shadow-lg max-w-sm w-full">
                    <AlertTriangle className="mx-auto text-red-500 text-6xl mb-6" />
                    <h1 className="text-3xl font-semibold text-titleText mb-4">
                        Oops! Something went wrong.
                    </h1>
                    <p className="text-lg text-baseText mb-6">{errorMessage}</p>
                    <div className="flex items-center justify-between gap-2 mx-auto w-1/2">
                        <button
                            onClick={handleReload}
                            className="w-28 py-3 bg-baseColor text-white rounded-lg text-lg hover:bg-red-600 transition"
                        >
                            Reload
                        </button>
                        <button
                            onClick={handleGoHome}
                            className="w-28 py-3 bg-red-500 text-white rounded-lg text-lg hover:bg-red-600 transition"
                        >
                            Home
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return token ? <AppLayout>{errorComponent()}</AppLayout> : errorComponent()
}
