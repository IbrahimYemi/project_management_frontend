import { usePaginatedQuery } from '@/hooks/usePaginatedQuery'
import { fetchProjectsData } from '@/lib/fn/projects'
import { ALL_PROJECTS_QUERY_KEY } from '@/store/constants'
import { ApiProjectsResponse } from '@/types/projects'

export function useProjects() {
    return usePaginatedQuery<ApiProjectsResponse>({
        queryKey: ALL_PROJECTS_QUERY_KEY,
        fetchFunction: fetchProjectsData,
    })
}
