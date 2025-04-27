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
    teamlead_id: string
    dueDate: string
    due_date?: string
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

export type CreateTaskParams = {
    title: string
    description: string
    status_id: string
    assigned_to: string
    project_id: string
    due_date: string
    priority_id: string
    priority_name?: string
    taskImage?: string
}

export type CreateTaskFileParams = {
    task_id: string
    name: string
    url: string
    type: 'image' | 'docs'
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

export type DiscussionParams = {
    task_id: string
    content: string
}

export type ApiTaskResponse = ApiSuccessResponse & {
    data: TaskType[]
}

export type ApiTaskDetailsResponse = ApiSuccessResponse & {
    data: TaskType
}
