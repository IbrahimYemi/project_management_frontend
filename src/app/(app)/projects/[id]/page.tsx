'use client'

import ErrorPage from '@/components/cards/ErrorPage'
import ProjectDetailScreen from '@/screens/protected/projects/ProjectDetailScreen'
import { useParams } from 'next/navigation'

export default function ProjectsPage() {
    const { id } = useParams()

    if (!id || Array.isArray(id)) {
        return <ErrorPage error={'Invalid project ID'} />
    }

    return <ProjectDetailScreen id={id} />
}
