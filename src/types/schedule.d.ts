import { ApiSuccessResponse } from './generic'

export type Schedule = {
    id: string
    date: string
    time: string
    agenda: string
    link?: string
    projectName?: string
    teamName?: string
    taskName?: string
}

export type CreateScheduleParams = {
    date: string
    time: string
    agenda: string
    link?: string
    project_id?: string
    team_id?: string
    task_id?: string
}

export type ApiScheduleResponse = ApiSuccessResponse & {
    data: Schedule[]
}

export type DateRange = {
    startDate: Date | null
    endDate: Date | null
}
