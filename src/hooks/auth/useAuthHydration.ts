import { useEffect } from 'react'
import { removeUser, setUser } from '@/store/slices/authSlice'
import { User } from '@/types/authTypes'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store/hooks'
import { toast } from 'react-toastify'
import { appStorage, logoutAppUser } from '@/lib/generic.fn'
import {
    AUTH_SESSION_DURATION_STORAGE_KEY,
    AUTH_TOKEN_STORAGE_KEY,
    AUTH_USER_STORAGE_KEY,
} from '@/store/constants'

export const useAuthHydration = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    useEffect(() => {
        const userData = appStorage.retrieve(AUTH_USER_STORAGE_KEY)
        const token = appStorage.retrieve(AUTH_TOKEN_STORAGE_KEY)
        const loginAt = appStorage.retrieve(AUTH_SESSION_DURATION_STORAGE_KEY)

        if (!userData || !token || !loginAt) {
            logoutAppUser()
            dispatch(removeUser())
            toast.error('You must be logged in to access the app.')
            router.replace('/auth/login')
            return
        }

        const currentTime = Date.now()
        const sessionDuration = 32 * 60 * 60 * 1000 // 32 hours in milliseconds
        const loginAtMs = parseInt(loginAt, 10) * 1000 // Convert loginAt to milliseconds

        if (currentTime - loginAtMs > sessionDuration) {
            // Logout user after 32 hours
            logoutAppUser()
            dispatch(removeUser())
            toast.error('Session expired. Please log in again.')
            router.replace('/auth/login')
            return
        }

        // If session is still valid, set the user
        const user: User = JSON.parse(userData)
        dispatch(setUser(user))
    }, [dispatch, router])
}
