import { fetchTeamById } from '@/lib/fn/teams'
import { QUERY_KEYS } from '@/store/constants'
import { TeamDetails } from '@/types/teams'
import { useQuery } from '@tanstack/react-query'

export const useFetchTeam = (teamId: string) => {
    return useQuery<TeamDetails>({
        queryKey: [QUERY_KEYS.TEAMS.SINGLE, teamId],
        queryFn: () => fetchTeamById(teamId),
        enabled: !!teamId,
        retry: 1,
        staleTime: 1000 * 60 * 15,
    })
}
