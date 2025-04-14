import { ApiScheduleResponse, CreateScheduleParams } from '@/types/schedule'
import apiClient from '../axios'
import { ApiNoResponse } from '@/types/generic'

export const fetchSchedulesData = async (
    page = 1,
    perPage = 20,
    query = '',
    start: Date | null = null,
    end: Date | null = null,
    resourceId?: string, // projectId as resourceId
): Promise<ApiScheduleResponse> => {
    let url = resourceId
        ? `/api/meetings/project/${resourceId}?page=${page}&per_page=${perPage}`
        : `/api/meetings?page=${page}&per_page=${perPage}`

    if (query) url += `&query=${encodeURIComponent(query)}`
    if (start) url += `&start=${start.toISOString()}`
    if (end) url += `&end=${end.toISOString()}`

    const response = await apiClient.get<ApiScheduleResponse>(url)
    console.log('object', resourceId, response.data || [], url)
    return response.data
}

export const createSchedule = async (params: CreateScheduleParams) => {
    const response = await apiClient.post<ApiNoResponse>(
        '/api/meetings',
        params,
    )
    return response.data
}

export const editSchedule = async (
    params: CreateScheduleParams,
    id: string,
) => {
    const response = await apiClient.put<ApiNoResponse>(
        `/api/meetings/${id}`,
        params,
    )
    return response.data
}

export const deleteSchedule = async (id: string) => {
    const response = await apiClient.delete<ApiNoResponse>(
        `/api/meetings/${id}`,
    )
    return response.data
}
