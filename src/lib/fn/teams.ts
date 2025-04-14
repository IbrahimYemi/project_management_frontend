import apiClient from '../axios'
import {
    ApiTeamDetailsResponse,
    ApiTeamsResponse,
    CreateTeamParams,
    Team,
    TeamDetails,
} from '@/types/teams'
import { ApiNoResponse } from '@/types/generic'

export const fetchTeamsData = async (): Promise<Team[]> => {
    const response = await apiClient.get<ApiTeamsResponse>('/api/teams')
    return response.data.data
}

export const fetchTeamById = async (id: string): Promise<TeamDetails> => {
    const response = await apiClient.get<ApiTeamDetailsResponse>(
        `/api/teams/${id}`,
    )
    return response.data.data
}

export const createTeam = async (params: CreateTeamParams) => {
    const response = await apiClient.post<ApiNoResponse>('/api/teams', params)
    return response.data
}

export const editTeam = async (params: CreateTeamParams, id: string) => {
    const response = await apiClient.put<ApiNoResponse>(
        `/api/teams/${id}`,
        params,
    )
    return response.data
}

export const deleteTeam = async (id: string) => {
    const response = await apiClient.delete<ApiNoResponse>(
        '/api/teams' + `/${id}`,
    )
    return response.data
}
