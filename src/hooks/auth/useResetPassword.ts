import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { ResetPasswordParams } from '@/types/authTypes'
import { resetPassword } from '@/lib/fn/auth'
import { ApiErrorResponse, ApiAuthResponse } from '@/types/generic'
import { handleMutationError } from '@/lib/fn/handleMutationError'

export const useResetPassword = () => {
    const router = useRouter()
    return useMutation<
        ApiAuthResponse,
        AxiosError<ApiErrorResponse>,
        ResetPasswordParams
    >({
        mutationFn: resetPassword,
        onSuccess: () => {
            toast.success('Password reset successfully!')
            router.push('/auth/login')
        },
        onError: handleMutationError,
    })
}
