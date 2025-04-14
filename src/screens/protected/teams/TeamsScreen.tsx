'use client'

import AppLayout from '@/components/app/AppLayout'
import TeamManagementTable from '@/components/cards/TeamsTable'
import { useTeamActions } from '@/hooks/teams/useTeamActions'
import { useTeams } from '@/hooks/teams/useTeams'
import { useAppDispatch } from '@/store/hooks'
import { setAppState } from '@/store/slices/appStateSlice'
import React from 'react'

export default function TeamsScreen() {
    const dispatch = useAppDispatch()
    const { data, isLoading } = useTeams()
    const { deleteTeam } = useTeamActions()

    const handleDeleteTeam = (id: string) => {
        dispatch(setAppState('isRequesting'))
        deleteTeam(id)
    }

    return (
        <AppLayout isLoading={isLoading}>
            <TeamManagementTable
                teams={data || []}
                onDelete={handleDeleteTeam}
            />
        </AppLayout>
    )
}
