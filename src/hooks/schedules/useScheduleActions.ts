import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { handleMutationError } from '@/lib/fn/handleMutationError'
import { QUERY_KEYS } from '@/store/constants'
import { useAppDispatch } from '@/store/hooks'
import { handleMutationSuccess } from '@/lib/fn/handleMutationSuccess'
import { ApiErrorResponse, ApiNoResponse } from '@/types/generic'
import { setAppState } from '@/store/slices/appStateSlice'
import {
    createSchedule,
    editSchedule,
    deleteSchedule,
} from '@/lib/fn/schedules'
import { CreateScheduleParams } from '@/types/schedule'

export const useScheduleActions = () => {
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()

    const createScheduleMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        CreateScheduleParams
    >({
        mutationFn: createSchedule,
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: data => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'Schedule created successfully!',
                queryKeys: [QUERY_KEYS.SCHEDULES, QUERY_KEYS.NOTIFICATIONS],
            })
        },
    })

    const editScheduleMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        { id: string; data: CreateScheduleParams }
    >({
        mutationFn: ({ id, data }) => editSchedule(data, id),
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: data => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'Schedule updated successfully!',
                queryKeys: [QUERY_KEYS.SCHEDULES, QUERY_KEYS.NOTIFICATIONS],
            })
        },
    })

    const deleteScheduleMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        string
    >({
        mutationFn: deleteSchedule,
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: data => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'Schedule deleted successfully!',
                queryKeys: [QUERY_KEYS.SCHEDULES, QUERY_KEYS.NOTIFICATIONS],
            })
        },
    })

    return {
        createSchedule: createScheduleMutation.mutate,
        isCreateScheduleLoading: createScheduleMutation.isPending,
        isCreateScheduleError: createScheduleMutation.isError,
        isCreateScheduleSuccess: createScheduleMutation.isSuccess,

        editSchedule: editScheduleMutation.mutate,
        isEditScheduleLoading: editScheduleMutation.isPending,
        isEditScheduleError: editScheduleMutation.isError,
        isEditScheduleSuccess: editScheduleMutation.isSuccess,

        deleteSchedule: deleteScheduleMutation.mutate,
        isDeleteScheduleLoading: deleteScheduleMutation.isPending,
        isDeleteScheduleError: deleteScheduleMutation.isError,
        isDeleteScheduleSuccess: deleteScheduleMutation.isSuccess,
    }
}
