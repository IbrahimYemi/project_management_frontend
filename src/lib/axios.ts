import axios from 'axios'
import { toast } from 'react-toastify'
import { appStorage, logoutAppUser } from './generic.fn'
import { AUTH_TOKEN_STORAGE_KEY } from '@/store/constants'

// Setup axios instance with credentials & base config
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

// Add a request interceptor to include the token
apiClient.interceptors.request.use(
    config => {
        const token = appStorage.retrieve(AUTH_TOKEN_STORAGE_KEY)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => Promise.reject(error),
)

// Add a response interceptor to catch 401 errors and clear local storage
apiClient.interceptors.response.use(
    response => response,
    error => {
        if (
            (error.response && error.response.status === 401) ||
            (error.response && error.response.status === 419)
        ) {
            console.warn('Session expired (401). Clearing local storage...')

            // Reset the auth
            logoutAppUser()

            window.location.href = '/auth/login'

            toast.error('Session expired. Please log in again.')
        }

        return Promise.reject(error)
    },
)

export default apiClient
