import { User } from './authTypes'
import { ApiSuccessResponse } from './generic'
import { Projects } from './projects'

export type Team = {
    id: string
    name: string
    teamLead: string
    teamLead: string
    members: number
    projectCount: number
}

export type TeamDetails = Team & {
    team_members: TeamMember[]
    project_on: Projects[]
}

export type TeamMember = User

export type ApiTeamsResponse = ApiSuccessResponse & {
    data: Team[]
}

export type ApiTeamDetailsResponse = ApiSuccessResponse & {
    data: TeamDetails
}

export type CreateTeamParams = {
    name: string
    team_lead_id: string
    members: string[]
}
