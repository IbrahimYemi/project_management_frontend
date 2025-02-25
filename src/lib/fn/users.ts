import {
    ApiInvitedUsersResponse,
    ApiUsersResponse,
    InviteUserParam,
} from '@/types/users'
import apiClient from '../axios'
import { ApiNoResponse } from '@/types/generic'

export const fetchUsersData = async (
    page = 1,
    perPage = 20,
    query = '',
): Promise<ApiUsersResponse> => {
    let url = `/api/all-users?page=${page}&per_page=${perPage}`
    url = query ? `${url}&query=${query}` : url
    const response = await apiClient.get<ApiUsersResponse>(url)
    return response.data
}

export const inviteUser = async (params: InviteUserParam) => {
    const response = await apiClient.post<ApiNoResponse>('/api/invite', params)
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
