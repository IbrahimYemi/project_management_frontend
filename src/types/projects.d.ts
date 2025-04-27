import { User } from './authTypes'
import { ApiSuccessResponse } from './generic'
import { TaskStatus, TaskType } from './tasks'
import { Team } from './teams'

export type Projects = {
    id: string
    name: string
    description: string
    task_count: number
    members_count: number
    team_name: string
    team_id?: string
    percentage: number
    is_completed: boolean
    created_at?: string
    updated_at?: string
    due_date?: string
    task_status?: TaskStatus[]
    status_id?: string
    status: ProjectStatusType
}

export type ProjectStatusType = {
    id: string
    name: string
    percentage: number
}

export type ProjectDetails = {
    project: Projects
    team: Team
    members: User[]
    tasks: TaskType[]
    priorities: Priority[]
}

export type Priority = {
    id: string
    name: string
}

export type CreateProjectParams = {
    name: string
    description?: string
    team_id: string
    status_id: string
    task_statuses?: {
        name: string
        percentage: string | number
    }[]
}

export type ApiProjectsResponseData = {
    data: Projects[]
    last_page: number
}

export type ApiProjectsResponse = ApiSuccessResponse & {
    data: ApiProjectsResponseData
}

export type ApiProjectDetailsResponse = ApiSuccessResponse & {
    data: ProjectDetails
}

export type ApiProjectStatusesResponse = ApiSuccessResponse & {
    data: ProjectStatusType[]
}

export type ApiUserProjectResponse = ApiSuccessResponse & {
    data: Projects[]
}
