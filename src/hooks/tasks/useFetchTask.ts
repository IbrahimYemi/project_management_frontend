import { fetchTaskById } from '@/lib/fn/tasks'
import { QUERY_KEYS } from '@/store/constants'
import { TaskType } from '@/types/tasks'
import { useQuery } from '@tanstack/react-query'

export const useFetchTask = (taskId: string) => {
    return useQuery<TaskType>({
        queryKey: [QUERY_KEYS.TASKS.SINGLE, taskId],
        queryFn: () => fetchTaskById(taskId),
        enabled: !!taskId,
        retry: 1,
        staleTime: 1000 * 60 * 15,
    })
}
