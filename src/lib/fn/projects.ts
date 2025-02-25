import { ApiProjectsResponse } from '@/types/projects'
import apiClient from '../axios'

export const fetchProjectsData = async (
    page = 1,
    perPage = 20,
    query = '',
): Promise<ApiProjectsResponse> => {
    let url = `/api/projects?page=${page}&per_page=${perPage}`
    url = query ? `${url}&query=${query}` : url
    const response = await apiClient.get<ApiProjectsResponse>(url)
    return response.data
}
