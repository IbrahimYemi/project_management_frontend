/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from 'swr'
import axios from '@/lib/axios'
import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface AuthProps {
    middleware?: 'auth' | 'guest'
    redirectIfAuthenticated?: string
}

interface AuthFunctionParams {
    setErrors: (errors: Record<string, string[]>) => void
    setStatus?: (status: string | null) => void
    email?: string
    token?: string
    [key: string]: any
}

export const useAuth = ({
    middleware,
    redirectIfAuthenticated,
}: AuthProps = {}) => {
    const router = useRouter()

    const {
        data: user,
        error,
        mutate,
    } = useSWR('/api/user', async () => {
        try {
            const res = await axios.get('/api/user')
            return res.data
        } catch (error: any) {
            if (error.response?.status !== 409) throw error
            router.push('/verify-email')
        }
    })

    const csrf = async () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }: AuthFunctionParams) => {
        await csrf()
        setErrors({})

        try {
            await axios.post('/register', props)
            mutate()
        } catch (error: any) {
            if (error.response?.status !== 422) throw error
            setErrors(error.response.data.errors)
        }
    }

    const login = async ({
        setErrors,
        setStatus,
        ...props
    }: AuthFunctionParams) => {
        await csrf()
        setErrors({})
        setStatus?.(null)

        try {
            await axios.post('/login', props)
            mutate()
        } catch (error: any) {
            if (error.response?.status !== 422) throw error
            setErrors(error.response.data.errors)
        }
    }

    const forgotPassword = async ({
        setErrors,
        setStatus,
        email,
    }: AuthFunctionParams) => {
        await csrf()
        setErrors({})
        setStatus?.(null)

        try {
            const response = await axios.post('/forgot-password', { email })
            setStatus?.(response.data.status)
        } catch (error: any) {
            if (error.response?.status !== 422) throw error
            setErrors(error.response.data.errors)
        }
    }

    const resetPassword = async ({
        token,
        email,
        password,
        password_confirmation,
        setErrors,
        setStatus,
    }: AuthFunctionParams) => {
        await csrf()

        setErrors({})
        setStatus?.(null)

        try {
            const response = await axios.post('/reset-password', {
                token,
                email,
                password,
                password_confirmation,
            })

            // Assuming Laravel returns a status message like "Password reset successful"
            router.push(`/login?reset=${btoa(response.data.status)}`)
        } catch (error: any) {
            if (error.response?.status !== 422) throw error

            setErrors(error.response.data.errors)
        }
    }

    const resendEmailVerification = async ({
        setStatus,
    }: {
        setStatus: (status: string) => void
    }) => {
        const response = await axios.post('/email/verification-notification')
        setStatus(response.data.status)
    }

    const logout = useCallback(async () => {
        if (!error) {
            await axios.post('/logout')
            mutate()
        }
        window.location.pathname = '/login'
    }, [error, mutate])

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated)
        }

        if (middleware === 'auth' && !user?.email_verified_at) {
            router.push('/verify-email')
        }

        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        ) {
            router.push(redirectIfAuthenticated ?? '/')
        }

        if (middleware === 'auth' && error) logout()
    }, [user, error, middleware, redirectIfAuthenticated, logout, router])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
