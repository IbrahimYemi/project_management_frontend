import { fetchProjectStatuses } from '@/lib/fn/projects'
import { QUERY_KEYS } from '@/store/constants'
import { ProjectStatusType } from '@/types/projects'
import { useQuery } from '@tanstack/react-query'

export function useAllProjectStatuses() {
    return useQuery<ProjectStatusType[]>({
        queryKey: [QUERY_KEYS.PROJECTS.STATUS],
        queryFn: fetchProjectStatuses,
        staleTime: 1000 * 60 * 5,
    })
}
