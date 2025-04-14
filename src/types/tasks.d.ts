import { User } from './authTypes'
import { ApiSuccessResponse } from './generic'
import { Projects } from './projects'

export type TaskStatus = {
    id: number
    name: string
    percentage: number
}

export type TaskType = {
    id: string
    percentage: number
    name: string
    description: string
    status: TaskStatus
    project: Projects
    owner: User
    startDate: string
    dueDate: string
    createdDate: string
    updatedDate: string
    isCompleted: boolean
    priority: 'low' | 'normal' | 'medium' | 'high' | 'urgent' | 'daily'
    taskImage?: string
    taskDiscussionCount?: number
    discussions?: DiscussionType[]
    taskFileCount?: number
    files?: FileType[]
}

export type FileType = {
    id: string
    name: string
    url: string
    type: string
    user: User
    created_at: string
    updated_at: string
}

export type DiscussionType = {
    id: string
    message: string
    user: User
    created_at: string
    updated_at: string
}

export type ApiTaskResponse = ApiSuccessResponse & {
    data: TaskType[]
}

export type ApiTaskDetailsResponse = ApiSuccessResponse & {
    data: TaskType
}
