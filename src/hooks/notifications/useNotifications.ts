'use client'

import { fetchNotifications } from '@/lib/fn/notifications'
import { QUERY_KEYS } from '@/store/constants'
import { NotificationType } from '@/types/notification'
import { useQuery } from '@tanstack/react-query'

export const useNotifications = (enabled: boolean) => {
    return useQuery<NotificationType[]>({
        queryKey: [QUERY_KEYS.NOTIFICATIONS],
        queryFn: fetchNotifications,
        enabled,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })
}
