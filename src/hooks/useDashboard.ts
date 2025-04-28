import { fetchDashboardData } from '@/lib/fn/dashboard'
import { QUERY_KEYS } from '@/store/constants'
import { DashboardData } from '@/types/dashboard'
import { useQuery } from '@tanstack/react-query'

export function useDashboard(fromDate?: string, toDate?: string) {
    return useQuery<DashboardData>({
        queryKey: [QUERY_KEYS.DASHBOARD, fromDate, toDate],
        queryFn: () => fetchDashboardData({ fromDate, toDate }),
        staleTime: 1000 * 60 * 5,
        retry: 1,
        enabled: false, // Disable automatic fetching
    })
}
