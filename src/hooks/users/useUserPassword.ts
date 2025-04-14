import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { handleMutationError } from '@/lib/fn/handleMutationError'
import { updatePassword } from '@/lib/fn/users'
import { QUERY_KEYS } from '@/store/constants'
import { useAppDispatch } from '@/store/hooks'
import { handleMutationSuccess } from '@/lib/fn/handleMutationSuccess'
import { ApiErrorResponse, ApiSuccessResponse } from '@/types/generic'
import { setAppState } from '@/store/slices/appStateSlice'
import { UpdatePasswordParams } from '@/types/authTypes'

export const useUserPassword = () => {
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()

    const useCreateMutation = (
        mutationFn: (
            params: UpdatePasswordParams,
        ) => Promise<ApiSuccessResponse>,
        action: string,
    ) =>
        useMutation<
            ApiSuccessResponse,
            AxiosError<ApiErrorResponse>,
            UpdatePasswordParams
        >({
            mutationFn,
            onError: error => {
                dispatch(setAppState('isIdle'))
                handleMutationError(error)
            },
            onSuccess: data => {
                handleMutationSuccess({
                    dispatch,
                    queryClient,
                    message: data.message || `${action} successful!`,
                    queryKeys: [QUERY_KEYS.USERS.ALL],
                })
            },
        })

    const passwordMutation = useCreateMutation(
        updatePassword,
        'Password update',
    )

    return {
        updatePassword: passwordMutation.mutate,
        isPasswordLoading: passwordMutation.isPending,
        isPasswordError: passwordMutation.isError,
        isPasswordSuccess: passwordMutation.isSuccess,
    }
}
