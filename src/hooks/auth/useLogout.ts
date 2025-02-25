import { logoutUser } from '@/lib/fn/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store/hooks'
import { removeUser } from '@/store/slices/authSlice'
import { ApiErrorResponse, ApiAuthResponse } from '@/types/generic'
import { AUTH_USER_QUERY_KEY } from '@/store/constants'
import { setAppState } from '@/store/slices/appStateSlice'
import { logoutAppUser } from '@/lib/generic.fn'

export const useLogout = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()

    const mutation = useMutation<ApiAuthResponse, AxiosError<ApiErrorResponse>>(
        {
            mutationFn: logoutUser,
            onSuccess: () => {
                dispatch(removeUser())
                logoutAppUser()
                queryClient.removeQueries({ queryKey: AUTH_USER_QUERY_KEY })

                router.push('/auth/login')

                dispatch(setAppState('isIdle'))
                toast.success('Logged out successfully!')
            },
            onError: error => {
                dispatch(setAppState('isError'))
                toast.error(
                    error.response?.data?.message ||
                        'Failed to log out. Please try again.',
                )
            },
        },
    )

    return { logout: mutation.mutate, ...mutation }
}
