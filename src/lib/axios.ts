import axios from 'axios'
import { appStorage, logoutAppUser } from './generic.fn'
import { STORAGE_KEYS } from '@/store/constants'

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
        const token = appStorage.retrieve(STORAGE_KEYS.AUTH_TOKEN)
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
            // Reset the auth
            logoutAppUser()
        }

        return Promise.reject(error)
    },
)

export default apiClient
