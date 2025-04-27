import { fetchTeamsData } from '@/lib/fn/teams'
import { QUERY_KEYS } from '@/store/constants'
import { Team } from '@/types/teams'
import { useQuery } from '@tanstack/react-query'

export function useTeams() {
    return useQuery<Team[]>({
        queryKey: [QUERY_KEYS.TEAMS.ALL],
        queryFn: fetchTeamsData,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })
}
