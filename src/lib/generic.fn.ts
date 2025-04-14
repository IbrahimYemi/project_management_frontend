'use client'

import { STORAGE_KEYS } from '@/store/constants'
import { ApiAuthResponse } from '@/types/generic'
import CryptoJS from 'crypto-js'

export function logoutAppUser() {
    appStorage.remove(STORAGE_KEYS.AUTH_TOKEN)
    appStorage.remove(STORAGE_KEYS.AUTH_USER)
    appStorage.remove(STORAGE_KEYS.SESSION_DURATION)

    window.location.href = '/auth/login'
}

export function persistAppUser(data: ApiAuthResponse) {
    appStorage.persist(STORAGE_KEYS.AUTH_TOKEN, data.token || '')
    appStorage.persist(STORAGE_KEYS.AUTH_USER, JSON.stringify(data.data) || '')
    appStorage.persist(STORAGE_KEYS.SESSION_DURATION, data.loginAt || '')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number,
) {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), delay)
    }
}

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY
if (!SECRET_KEY) throw new Error('Secret key is not defined in .env')

const encrypt = (data: string): string => {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString()
}

const decrypt = (cipher: string): string => {
    try {
        const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY)
        const decrypted = bytes.toString(CryptoJS.enc.Utf8)
        if (!decrypted) throw new Error('Decryption failed')
        return decrypted
    } catch {
        console.warn('Failed to decrypt value from localStorage')
        return ''
    }
}

export const appStorage = {
    persist: <T = string>(key: string, value: T): void => {
        try {
            if (typeof window === 'undefined') return

            const payload = value
            const encryptedValue = encrypt(String(payload))
            localStorage.setItem(key, encryptedValue)
        } catch (error) {
            console.error(`Error setting ${key} in localStorage`, error)
        }
    },

    retrieve: <T = string>(key: string): T | null => {
        try {
            if (typeof window === 'undefined') return null

            const encryptedValue = localStorage.getItem(key)
            if (!encryptedValue) return null

            const decrypted = decrypt(encryptedValue)
            return decrypted as T
        } catch (error) {
            console.error(`Error getting ${key} from localStorage`, error)
            return null
        }
    },

    remove: (key: string): void => {
        try {
            if (typeof window === 'undefined') return

            localStorage.removeItem(key)
        } catch (error) {
            console.error(`Error removing ${key} from localStorage`, error)
        }
    },
}
