import { usePaginatedQuery } from '@/hooks/usePaginatedQuery'
import { fetchSchedulesData } from '@/lib/fn/schedules'
import { QUERY_KEYS } from '@/store/constants'
import { ApiScheduleResponse } from '@/types/schedule'

export function useSchedules({ projectId }: { projectId?: string } = {}) {
    return usePaginatedQuery<ApiScheduleResponse>({
        queryKey: QUERY_KEYS.SCHEDULES,
        fetchFunction: fetchSchedulesData,
        resourceId: projectId,
    })
}
