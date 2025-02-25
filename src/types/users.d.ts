import { User } from './authTypes'
import { ApiSuccessResponse } from './generic'

export type ApiUsersResponseData = {
    data: User[]
    last_page: number
}

export type ApiUsersResponse = ApiSuccessResponse & {
    data: ApiUsersResponseData
}

export type ApiInvitedUsersResponse = ApiSuccessResponse & {
    data: ApiInvitedUsersResponseData
}

export type ApiInvitedUsersResponseData = {
    data: Invitation[]
    last_page: number
}

export type Invitation = {
    id: string
    email: string
    name: string
    token: string
    is_accepted: boolean
}

export type InviteUserParam = {
    email: string
    name: string
}
