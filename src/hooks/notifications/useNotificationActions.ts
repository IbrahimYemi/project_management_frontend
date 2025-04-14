import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { handleMutationError } from '@/lib/fn/handleMutationError'
import { handleMutationSuccess } from '@/lib/fn/handleMutationSuccess'
import { QUERY_KEYS } from '@/store/constants'
import { setAppState } from '@/store/slices/appStateSlice'
import { useAppDispatch } from '@/store/hooks'
import {
    markNotificationAsRead,
    markAllNotificationsAsRead,
} from '@/lib/fn/notifications'
import { ApiErrorResponse, ApiNoResponse } from '@/types/generic'

export const useNotificationActions = () => {
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()

    const markAsReadMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        string
    >({
        mutationFn: markNotificationAsRead,
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: data => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'Notification marked as read.',
                queryKeys: [QUERY_KEYS.NOTIFICATIONS],
            })
        },
    })

    const markAllAsReadMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>
    >({
        mutationFn: markAllNotificationsAsRead,
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: data => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'All notifications marked as read.',
                queryKeys: [QUERY_KEYS.NOTIFICATIONS],
            })
        },
    })

    return {
        markNotificationAsRead: markAsReadMutation.mutate,
        isMarkNotificationLoading: markAsReadMutation.isPending,
        isMarkNotificationError: markAsReadMutation.isError,
        isMarkNotificationSuccess: markAsReadMutation.isSuccess,

        markAllNotificationsAsRead: markAllAsReadMutation.mutate,
        isMarkAllNotificationsLoading: markAllAsReadMutation.isPending,
        isMarkAllNotificationsError: markAllAsReadMutation.isError,
        isMarkAllNotificationsSuccess: markAllAsReadMutation.isSuccess,
    }
}
