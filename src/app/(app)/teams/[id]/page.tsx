'use client'

import ErrorPage from '@/components/cards/ErrorPage'
import TeamDetailScreen from '@/screens/protected/teams/TeamDetailScreen'
import { useParams } from 'next/navigation'

export default function TeamsPage() {
    const { id } = useParams()

    if (!id || Array.isArray(id)) {
        return <ErrorPage error={'Invalid team ID'} />
    }

    return <TeamDetailScreen id={id} />
}
