import { ApiDashboardResponse, DashboardData } from '@/types/dashboard'
import apiClient from '../axios'

export const fetchDashboardData = async (): Promise<DashboardData> => {
    const response = await apiClient.get<ApiDashboardResponse>('/api/dashboard')
    return response.data.data
}
