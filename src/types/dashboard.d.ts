import { ApiSuccessResponse } from './generic'
import { Schedule } from './schedule'
import { Team } from './teams'

export type Project = {
    name: string
    value: number
}

export type AllProject = Project & {
    statusName: string
}

export type Task = {
    name: string
    value: number
    owner: string
}

export type Meeting = Schedule

export type ProjectLineChartProps = {
    title?: string
    description?: string
    projectsData: Project[]
}

export type DashboardData = {
    projects: Project[]
    tasks: Task[]
    meetings: Meeting[]
    teams: Team[]
    allProjectsData: AllProject[]
}

export type ApiDashboardResponse = ApiSuccessResponse & {
    data: DashboardData
}
