import {
    ApiAllUsersResponse,
    ApiInvitedUsersResponse,
    ApiUserDetailsResponse,
    ApiUsersResponse,
    InviteUserParam,
    UserActionsType,
} from '@/types/users'
import apiClient from '../axios'
import {
    ApiAuthResponse,
    ApiNoResponse,
    ApiSuccessResponse,
} from '@/types/generic'
import {
    UpdateAvatarParams,
    UpdatePasswordParams,
    User,
} from '@/types/authTypes'

export const fetchUsersData = async (
    page = 1,
    perPage = 10,
    query = '',
): Promise<ApiUsersResponse> => {
    let url = `/api/all-users?page=${page}&per_page=${perPage}`
    url = query ? `${url}&query=${query}` : url
    const response = await apiClient.get<ApiUsersResponse>(url)
    return response.data
}

export const fetchUserData = async (id: string) => {
    const response = await apiClient.get<ApiUserDetailsResponse>(
        `/api/users/${id}/get-details`,
    )
    return response.data.data
}

export const fetchAllUsersData = async (): Promise<User[]> => {
    const response = await apiClient.get<ApiAllUsersResponse>(
        '/api/all-unpaginated-users',
    )
    return response.data.data ?? []
}

export const inviteUser = async (params: InviteUserParam) => {
    const response = await apiClient.post<ApiNoResponse>('/api/invite', params)
    return response.data
}

export const reinviteUser = async (id: string) => {
    const response = await apiClient.post<ApiNoResponse>(
        `/api/invite/${id}/resend`,
    )
    return response.data
}

export const deleteInvitedUser = async (id: string) => {
    const response = await apiClient.delete<ApiNoResponse>(`/api/invite/${id}`)
    return response.data
}

export const fetchInvitedUsersData = async (
    page = 1,
    perPage = 20,
    query = '',
): Promise<ApiInvitedUsersResponse> => {
    let url = `/api/all-invites?page=${page}&per_page=${perPage}`
    url = query ? `${url}&query=${query}` : url
    const response = await apiClient.get<ApiInvitedUsersResponse>(url)
    return response.data
}

export const restrictUser = async (id: string) => {
    const response = await apiClient.post<ApiNoResponse>(
        `/api/restrict-user/${id}`,
    )
    return response.data
}

export const activateUser = async (id: string) => {
    const response = await apiClient.post<ApiNoResponse>(
        `/api/activate-user/${id}`,
    )
    return response.data
}

export const deleteUser = async (id: string) => {
    const response = await apiClient.delete<ApiNoResponse>(
        `/api/delete-user/${id}`,
    )
    return response.data
}

export const changeRole = async (id: string, type: UserActionsType) => {
    const role =
        type === 'make-admin'
            ? 'Admin'
            : type === 'make-teamlead'
              ? 'Team Lead'
              : 'Member'
    const params = { app_role: role }
    const response = await apiClient.post<ApiNoResponse>(
        `/api/change-user-role/${id}`,
        params,
    )
    return response.data
}

export const updatePassword = async (params: UpdatePasswordParams) => {
    const response = await apiClient.put<ApiSuccessResponse>(
        '/api/update-password',
        params,
    )
    return response.data
}

export const updateUserAvatar = async (params: UpdateAvatarParams) => {
    const response = await apiClient.put<ApiAuthResponse>(
        '/api/update-user-avatar',
        params,
    )
    return response.data
}
