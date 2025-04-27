'use client'

import TaskDetailScreen from '@/screens/protected/tasks/TaskDetailScreen'
import ErrorPage from '@/components/cards/ErrorPage'
import { useParams } from 'next/navigation'

export default function TaskPage() {
    const { id } = useParams()

    if (!id || Array.isArray(id)) {
        return <ErrorPage error={'Invalid task ID'} />
    }

    return <TaskDetailScreen id={id} />
}
