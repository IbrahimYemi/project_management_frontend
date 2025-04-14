import { usePaginatedQuery } from '@/hooks/usePaginatedQuery'
import { fetchTasksData } from '@/lib/fn/tasks'
import { QUERY_KEYS } from '@/store/constants'
import { ApiTaskResponse } from '@/types/tasks'

export function useTasks() {
    return usePaginatedQuery<ApiTaskResponse>({
        queryKey: QUERY_KEYS.TASKS.ALL,
        fetchFunction: fetchTasksData,
    })
}
