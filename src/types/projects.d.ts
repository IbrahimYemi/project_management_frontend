import { ApiSuccessResponse } from './generic'

export type Project = {
    name: string
    description: string
    task_count: number
    members_count: number
    team_name: string
    percentage: number
    is_completed: boolean
}

export type ApiProjectsResponseData = {
    data: Project[]
    last_page: number
}

export type ApiProjectsResponse = ApiSuccessResponse & {
    data: ApiProjectsResponseData
}
