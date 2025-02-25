import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useAppDispatch } from '@/store/hooks'
import { setUser } from '@/store/slices/authSlice'
import { AUTH_USER_QUERY_KEY } from '@/store/constants'
import { ApiErrorResponse, ApiAuthResponse } from '@/types/generic'
import { handleMutationError } from '@/lib/fn/handleMutationError'
import { persistAppUser } from '@/lib/generic.fn'

const useAuthMutation = <TVariables>(
    mutationFn: (variables: TVariables) => Promise<ApiAuthResponse>,
    onSuccessRedirectPath?: string,
    persistUser = false,
) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()

    return useMutation<
        ApiAuthResponse,
        AxiosError<ApiErrorResponse>,
        TVariables
    >({
        mutationFn,
        onError: handleMutationError,
        onSuccess: data => {
            if (persistUser) {
                persistAppUser(data)
                dispatch(setUser(data.data))
            }

            queryClient.invalidateQueries({ queryKey: AUTH_USER_QUERY_KEY })

            if (onSuccessRedirectPath) {
                router.push(onSuccessRedirectPath)
            }

            toast.success(data.message || 'Success!')
        },
    })
}

export default useAuthMutation
