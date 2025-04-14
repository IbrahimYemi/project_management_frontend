import { useEffect } from 'react'
import { removeUser, setUser } from '@/store/slices/authSlice'
import { User } from '@/types/authTypes'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store/hooks'
import { appStorage, logoutAppUser } from '@/lib/generic.fn'
import { STORAGE_KEYS } from '@/store/constants'

export const useAuthHydration = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    useEffect(() => {
        const userData = appStorage.retrieve(STORAGE_KEYS.AUTH_USER)
        const token = appStorage.retrieve(STORAGE_KEYS.AUTH_TOKEN)
        const loginAt = appStorage.retrieve(STORAGE_KEYS.SESSION_DURATION)

        if (!userData || !token || !loginAt) {
            dispatch(removeUser())
            logoutAppUser()
            return
        }

        const currentTime = Date.now()
        const sessionDuration = 32 * 60 * 60 * 1000 // 32 hours in milliseconds
        const loginAtMs = parseInt(loginAt, 10) * 1000 // Convert loginAt to milliseconds

        if (currentTime - loginAtMs > sessionDuration) {
            // Logout user after 32 hours
            dispatch(removeUser())
            logoutAppUser()
            return
        }

        // If session is still valid, set the user
        const user: User = JSON.parse(userData)
        dispatch(setUser(user))
    }, [dispatch, router])
}
