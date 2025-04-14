'use client'

import TaskDetailScreen from '@/screens/protected/tasks/TaskDetailScreen'
import ErrorPage from '@/components/cards/ErrorPage'
import { useParams } from 'next/navigation'

export default function UsersPage() {
    const { id } = useParams()

    if (!id || Array.isArray(id)) {
        return <ErrorPage error={'Invalid project ID'} />
    }

    return <TaskDetailScreen id={id} />
}
