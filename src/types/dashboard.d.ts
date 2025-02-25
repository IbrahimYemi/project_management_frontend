import { ApiSuccessResponse } from './generic'

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

export type Meeting = {
    agenda: string
    date: string
    time: string
}

export type TeamMember = {
    name: string
    avatar: string
}

export type Team = {
    name: string
    teamLead: string
    members: number
    projectCount: number
}

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
