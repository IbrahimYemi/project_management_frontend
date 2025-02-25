import { requestToken } from '@/lib/fn/auth'
import { LoginToken } from '@/types/authTypes'
import { ApiErrorResponse, ApiAuthResponse } from '@/types/generic'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { toast } from 'react-toastify'
import { handleMutationError } from '@/lib/fn/handleMutationError'

export const useRequestLoginToken = () => {
    const mutation = useMutation<
        ApiAuthResponse,
        AxiosError<ApiErrorResponse>,
        LoginToken
    >({
        mutationFn: requestToken,
        onError: handleMutationError,
        onSuccess: data => {
            toast.success(data.message || 'Token sent!')
        },
    })

    return {
        request: mutation.mutate,
        isTokenLoading: mutation.isPending,
        isTokenError: mutation.isError,
        isTokenSuccess: mutation.isSuccess,
        data: mutation.data,
    }
}
