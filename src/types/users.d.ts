import { User } from './authTypes'
import { ApiSuccessResponse } from './generic'

export type ApiUsersResponseData = {
    data: User[]
    last_page: number
}

export type ApiUsersResponse = ApiSuccessResponse & {
    data: ApiUsersResponseData
}

export type ApiAllUsersResponse = ApiSuccessResponse & {
    data: User[]
}

export type ApiGetUserResponse = ApiSuccessResponse & {
    data: User
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

export type UserActionsType =
    | 'delete'
    | 'restrict'
    | 'activate'
    | 'make-admin'
    | 'make-teamlead'
    | 'make-member'
