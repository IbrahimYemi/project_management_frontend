import { User } from './authTypes'
import { ApiSuccessResponse } from './generic'
import { Projects } from './projects'

export type Note = {
    id: string
    title: string
    content: string
    created_at: string
    updated_at: number
    owner: User
    project: Projects
}

export type ApiNotesResponse = ApiSuccessResponse & {
    data: Team[]
}

export type CreateNoteParams = {
    title: string
    content: string
    project_id?: string
}
