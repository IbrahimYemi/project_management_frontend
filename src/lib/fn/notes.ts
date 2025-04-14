import { ApiNoResponse } from '@/types/generic'
import apiClient from '../axios'
import { ApiNotesResponse, CreateNoteParams, Note } from '@/types/notes'

export const fetchNotesData = async (id?: string): Promise<Note[]> => {
    let url
    if (id) {
        url = `/api/get-project-notes/${id}`
    } else {
        url = '/api/get-personal-notes'
    }
    const response = await apiClient.get<ApiNotesResponse>(url)
    return response.data.data
}

export const createNote = async (params: CreateNoteParams) => {
    const response = await apiClient.post<ApiNoResponse>('/api/notes', params)
    return response.data
}

export const editNote = async (params: CreateNoteParams, id: string) => {
    const response = await apiClient.put<ApiNoResponse>(
        `/api/notes/${id}`,
        params,
    )
    return response.data
}

export const deleteNote = async (id: string) => {
    const response = await apiClient.delete<ApiNoResponse>(`/api/notes/${id}`)
    return response.data
}
