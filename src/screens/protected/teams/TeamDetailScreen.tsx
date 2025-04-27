'use client'

import AppLayout from '@/components/app/AppLayout'
import ErrorPage from '@/components/cards/ErrorPage'
import TeamMembers from '@/components/cards/TeamMembers'
import ProjectsTable from '@/components/tables/ProjectsTable'
import { useFetchTeam } from '@/hooks/teams/useFetchTeam'
import { Team } from '@/types/teams'

export default function TeamDetailScreen({ id }: { id: string }) {
    const { data: teamDetails, isLoading, error, isError } = useFetchTeam(id)

    if (isError) return <ErrorPage error={error} />

    return (
        <AppLayout isLoading={isLoading}>
            <div className=" bg-baseColor p-4 rounded-lg text-white">
                {/* Team Members Section */}
                <TeamMembers
                    bgStyle="bg-baseColor text-white"
                    team={teamDetails ?? ({} as Team)}
                    members={teamDetails?.team_members ?? []}
                />
                <div className="w-full overflow-x-auto mt-5 p-4 rounded-lg">
                    <ProjectsTable
                        projects={teamDetails?.project_on ?? []}
                        completeFilter={false}
                    />
                </div>
            </div>
        </AppLayout>
    )
}
