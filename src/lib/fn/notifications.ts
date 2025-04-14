import {
    ApiNotificationsResponse,
    NotificationType,
} from '@/types/notification'
import apiClient from '../axios'
import { ApiNoResponse } from '@/types/generic'

export const fetchNotifications = async (): Promise<NotificationType[]> => {
    const res =
        await apiClient.get<ApiNotificationsResponse>('/api/notifications')
    return res.data.data
}

export const markNotificationAsRead = async (
    notificationId: string,
): Promise<ApiNoResponse> => {
    const res = await apiClient.post(
        `/api/notifications/${notificationId}/read`,
    )
    return res.data
}
export const markAllNotificationsAsRead = async (): Promise<ApiNoResponse> => {
    const res = await apiClient.post(`/api/notifications/mark-all-as-read`)
    return res.data
}
