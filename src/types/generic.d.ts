import { User } from './authTypes'

//API Success Response Type
export type ApiSuccessResponse = {
    success: boolean
    token?: string
    message: string
}

export type ApiNoResponse = ApiSuccessResponse & {
    data: []
}

// API Error Response Type
export type ApiErrorResponse = {
    success: boolean
    message: string
    data: {
        [key: string]: string[]
    }
    statusCode?: number
}

export type ApiAuthResponse = ApiSuccessResponse & {
    data: User
    loginAt: string
}
