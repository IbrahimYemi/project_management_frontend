import { fetchDashboardData } from '@/lib/fn/dashboard'
import { QUERY_KEYS } from '@/store/constants'
import { DashboardData } from '@/types/dashboard'
import { useQuery } from '@tanstack/react-query'

export function useDashboard() {
    return useQuery<DashboardData>({
        queryKey: [QUERY_KEYS.DASHBOARD],
        queryFn: fetchDashboardData,
        staleTime: 1000 * 60 * 5,
    })
}
