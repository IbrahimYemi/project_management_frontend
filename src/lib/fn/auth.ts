import apiClient from '@/lib/axios'
import {
    ForgotPasswordParams,
    LoginPasswordParams,
    LoginToken,
    LoginTokenParams,
    RegisterParams,
    ResetPasswordParams,
} from '@/types/authTypes'
import { ApiAuthResponse } from '@/types/generic'

export const csrf = async () => apiClient.get('/sanctum/csrf-cookie')

export const fetchAuthUser = async (): Promise<ApiAuthResponse['data']> => {
    const response = await apiClient.get<ApiAuthResponse>('/api/auth/user')
    return response.data.data
}

export const registerUser = async (params: RegisterParams) => {
    const response = await apiClient.post<ApiAuthResponse>(
        '/api/register',
        params,
    )
    return response.data
}

export const requestToken = async (params: LoginToken) => {
    const response = await apiClient.post<ApiAuthResponse>(
        '/api/auth/send-token',
        params,
    )
    return response.data
}

export const loginPasswordUser = async (params: LoginPasswordParams) => {
    const response = await apiClient.post<ApiAuthResponse>('/api/login', params)
    return response.data
}

export const loginTokenUser = async (params: LoginTokenParams) => {
    const response = await apiClient.post<ApiAuthResponse>(
        '/api/auth/login-with-token',
        params,
    )
    return response.data
}

export const logoutUser = async () => {
    const response = await apiClient.post('/api/auth/logout')
    return response.data
}

export const forgotPassword = async (email: ForgotPasswordParams) => {
    const response = await apiClient.post('/forgot-password', { email })
    return response.data.status
}

export const resetPassword = async (params: ResetPasswordParams) => {
    const response = await apiClient.post('/reset-password', params)
    return response.data.status
}
