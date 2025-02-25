import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { ForgotPasswordParams } from '@/types/authTypes'
import { forgotPassword } from '@/lib/fn/auth'
import { ApiErrorResponse } from '@/types/generic'
import { handleMutationError } from '@/lib/fn/handleMutationError'

export const useForgotPassword = () => {
    return useMutation<
        string,
        AxiosError<ApiErrorResponse>,
        ForgotPasswordParams
    >({
        mutationFn: forgotPassword,
        onSuccess: status => {
            toast.success(status || 'Password reset code sent successfully!')
        },
        onError: handleMutationError,
    })
}
