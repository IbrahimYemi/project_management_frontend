import { ApiSuccessResponse } from './generic'

export type NotificationType = {
    id: string
    message: string
    dataId: string
    type: 'discussion' | 'meeting' | 'task' | 'project' | 'other'
    created_at: string
    updated_at: string
}

export type ApiNotificationsResponse = ApiSuccessResponse & {
    data: NotificationType[]
}
