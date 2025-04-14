import { usePaginatedQuery } from '@/hooks/usePaginatedQuery'
import { fetchProjectsData } from '@/lib/fn/projects'
import { QUERY_KEYS } from '@/store/constants'
import { ApiProjectsResponse } from '@/types/projects'

export function useProjects() {
    return usePaginatedQuery<ApiProjectsResponse>({
        queryKey: QUERY_KEYS.PROJECTS.ALL,
        fetchFunction: fetchProjectsData,
    })
}
