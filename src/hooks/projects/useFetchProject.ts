import { fetchProjectById } from '@/lib/fn/projects'
import { QUERY_KEYS } from '@/store/constants'
import { ProjectDetails } from '@/types/projects'
import { useQuery } from '@tanstack/react-query'

export const useFetchProject = (projectId: string) => {
    return useQuery<ProjectDetails>({
        queryKey: [QUERY_KEYS.PROJECTS.SINGLE, projectId],
        queryFn: () => fetchProjectById(projectId),
        enabled: !!projectId,
        retry: 1,
        staleTime: 1000 * 60 * 15,
    })
}
