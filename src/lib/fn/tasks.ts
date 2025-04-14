import {
    ApiTaskDetailsResponse,
    ApiTaskResponse,
    TaskType,
} from '@/types/tasks'
import apiClient from '../axios'
import { mockTasks } from './projects'

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

export const fetchTaskById = async (id: string): Promise<TaskType> => {
    console.log(id)
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockApiTaskDetailResponse.data.data)
        }, 500)
    })
}

export const mockApiTaskDetailResponse: SampleData = {
    data: {
        success: true,
        message: 'Task details fetched successfully',
        data: mockTasks[0],
    },
}

type SampleData = {
    data: ApiTaskDetailsResponse
}
