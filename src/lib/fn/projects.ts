import {
    ApiProjectDetailsResponse,
    ApiProjectsResponse,
    ProjectDetails,
    Projects,
    ProjectStatusType,
    ApiProjectStatusesResponse,
    CreateProjectParams,
    ApiUserProjectResponse,
} from '@/types/projects'
import apiClient from '../axios'
import { ApiNoResponse } from '@/types/generic'

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

export const fetchProjectById = async (
    projectId: string,
): Promise<ProjectDetails> => {
    if (!projectId) throw new Error('Project ID is required')

    const response = await apiClient.get<ApiProjectDetailsResponse>(
        `/api/projects/${projectId}`,
    )
    return response.data.data
}

export const fetchProjectStatuses = async (): Promise<ProjectStatusType[]> => {
    const response = await apiClient.get<ApiProjectStatusesResponse>(
        '/api/projects-statuses',
    )
    return response.data.data
}

export const fetchUserProjects = async (
    userId: string,
): Promise<Projects[]> => {
    const response = await apiClient.get<ApiUserProjectResponse>(
        `/api/get-user-projects/${userId}`,
    )
    return response.data.data
}

export const createProject = async (params: CreateProjectParams) => {
    const response = await apiClient.post<ApiNoResponse>(
        '/api/projects',
        params,
    )
    return response.data
}

export const editProject = async (params: CreateProjectParams, id: string) => {
    const response = await apiClient.put<ApiNoResponse>(
        `/api/projects/${id}`,
        params,
    )
    return response.data
}

export const deleteProject = async (id: string) => {
    const response = await apiClient.delete<ApiNoResponse>(
        '/api/projects' + `/${id}`,
    )
    return response.data
}

export const markProjectComplete = async (id: string) => {
    const response = await apiClient.post<ApiNoResponse>(
        '/api/projects' + `/${id}/mark-as-completed`,
    )
    return response.data
}
