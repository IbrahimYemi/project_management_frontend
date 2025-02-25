import { fetchDashboardData } from '@/lib/fn/fetcher'
import { DASHBOARD_QUERY_KEY } from '@/store/constants'
import { DashboardData } from '@/types/dashboard'
import { useQuery } from '@tanstack/react-query'

export function useDashboard() {
    return useQuery<DashboardData>({
        queryKey: DASHBOARD_QUERY_KEY,
        queryFn: fetchDashboardData,
        staleTime: 1000 * 60 * 5,
    })
}
