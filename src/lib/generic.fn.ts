import {
    AUTH_SESSION_DURATION_STORAGE_KEY,
    AUTH_TOKEN_STORAGE_KEY,
    AUTH_USER_STORAGE_KEY,
} from '@/store/constants'
import { ApiAuthResponse } from '@/types/generic'

export function logoutAppUser() {
    appStorage.remove(AUTH_TOKEN_STORAGE_KEY)
    appStorage.remove(AUTH_USER_STORAGE_KEY)
    appStorage.remove(AUTH_SESSION_DURATION_STORAGE_KEY)
}

export function persistAppUser(data: ApiAuthResponse) {
    appStorage.persist(AUTH_TOKEN_STORAGE_KEY, data.token || '')
    appStorage.persist(AUTH_USER_STORAGE_KEY, JSON.stringify(data.data) || '')
    appStorage.persist(AUTH_SESSION_DURATION_STORAGE_KEY, data.loginAt || '')
}

export const appStorage = {
    persist: (key: string, value: string) => {
        try {
            localStorage.setItem(key, value)
        } catch (error) {
            console.error(`Error setting ${key} in localStorage`, error)
        }
    },

    retrieve: <T = string>(key: string): T | null => {
        try {
            const item = localStorage.getItem(key)
            return item ? (JSON.parse(item) as T) : null
        } catch (error) {
            console.error(`Error getting ${key} from localStorage`, error)
            return null
        }
    },

    remove: (key: string) => {
        try {
            localStorage.removeItem(key)
        } catch (error) {
            console.error(`Error removing ${key} from localStorage`, error)
        }
    },
}
