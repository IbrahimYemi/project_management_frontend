import {
    ApiTaskDetailsResponse,
    ApiTaskResponse,
    CreateTaskFileParams,
    CreateTaskParams,
    DiscussionParams,
    TaskType,
} from '@/types/tasks'
import apiClient from '../axios'
import { ApiNoResponse, ApiSuccessResponse } from '@/types/generic'

export const fetchTasksData = async (
    page = 1,
    perPage = 20,
    query = '',
): Promise<ApiTaskResponse> => {
    let url = `/api/tasks?page=${page}&per_page=${perPage}`
    url = query ? `${url}&query=${query}` : url
    const response = await apiClient.get<ApiTaskResponse>(url)
    return response.data
}

export const createTask = async (params: CreateTaskParams) => {
    const response = await apiClient.post<ApiNoResponse>('/api/tasks', params)
    return response.data
}

export const editTask = async (params: CreateTaskParams, id: string) => {
    const response = await apiClient.put<ApiNoResponse>(
        `/api/tasks/${id}`,
        params,
    )
    return response.data
}

export const deleteTask = async (id: string) => {
    const response = await apiClient.delete<ApiNoResponse>(
        '/api/tasks' + `/${id}`,
    )
    return response.data
}

export const markTaskComplete = async (id: string) => {
    const response = await apiClient.post<ApiNoResponse>(
        '/api/tasks' + `/${id}/mark-as-completed`,
    )
    return response.data
}

export const fetchTaskById = async (id: string): Promise<TaskType> => {
    const response = await apiClient.get<ApiTaskDetailsResponse>(`/api/tasks/${id}`)
    return response.data.data
}

export const createFile = async (params: CreateTaskFileParams) => {
    const response = await apiClient.post<ApiNoResponse>(`/api/tasks/${params.task_id}/files`, params)
    return response.data
}

export const deleteFile = async (id: string) => {
    const response = await apiClient.delete<ApiSuccessResponse>(
        '/api/tasks/files' + `/${id}`,
    )
    return response.data
}

export const createDiscussion = async (params: DiscussionParams) => {
    const response = await apiClient.post<ApiNoResponse>(`/api/tasks/${params.task_id}/discussions`, params)
    return response.data
}

export const deleteDiscussion = async (id: string) => {
    const response = await apiClient.delete<ApiSuccessResponse>(
        '/api/tasks/discussions' + `/${id}`,
    )
    return response.data
}

export const updateStatus= async (id: string, statusId: string) => {
    const params = {
        status_id: statusId
    }
    
    const response = await apiClient.put<ApiNoResponse>(
        `/api/tasks/${id}/update/task-status`, params
    )
    return response.data
}