import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { handleMutationError } from '@/lib/fn/handleMutationError'
import { deleteInvitedUser, reinviteUser } from '@/lib/fn/users'
import { QUERY_KEYS } from '@/store/constants'
import { useAppDispatch } from '@/store/hooks'
import { handleMutationSuccess } from '@/lib/fn/handleMutationSuccess'
import { ApiErrorResponse, ApiNoResponse } from '@/types/generic'
import { setAppState } from '@/store/slices/appStateSlice'

export const useUserInvitedActions = () => {
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()

    const reinviteMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        string
    >({
        mutationFn: reinviteUser,
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: data => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'Action successful!',
                queryKeys: [QUERY_KEYS.USERS.INVITED],
            })
        },
    })

    const deleteMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        string
    >({
        mutationFn: deleteInvitedUser,
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: data => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'Action successful!',
                queryKeys: [QUERY_KEYS.USERS.INVITED],
            })
        },
    })

    return {
        reinviteUser: reinviteMutation.mutate,
        isReinviteLoading: reinviteMutation.isPending,
        isReinviteError: reinviteMutation.isError,
        isReinviteSuccess: reinviteMutation.isSuccess,

        deleteUser: deleteMutation.mutate,
        isDeleteLoading: deleteMutation.isPending,
        isDeleteError: deleteMutation.isError,
        isDeleteSuccess: deleteMutation.isSuccess,
    }
}
