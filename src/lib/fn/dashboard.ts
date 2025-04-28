import { ApiDashboardResponse, DashboardData } from '@/types/dashboard'
import apiClient from '../axios'

export const fetchDashboardData = async (params?: { fromDate?: string; toDate?: string }): Promise<DashboardData> => {
    const response = await apiClient.get<ApiDashboardResponse>('/api/dashboard', { params })
    return response.data.data
}
