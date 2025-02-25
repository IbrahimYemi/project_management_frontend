import { DashboardData } from '@/types/dashboard'
// import apiClient from '../axios'
import { mockDashboardData } from '@/store/RoughData'

export const fetchDashboardData = async (): Promise<DashboardData> => {
    // Simulating a delay like an API request
    await new Promise(resolve => setTimeout(resolve, 1000))
    return mockDashboardData

    // const response = await apiClient.get<ApiDashboardResponse>('/api/dashboard')
    // return response.data.data
}
