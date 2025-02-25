import { ApiErrorResponse } from '@/types/generic'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

// Handle API validation errors or fallback errors
export const handleMutationError = (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.data?.data) {
        Object.entries(error.response.data.data).forEach(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ([field, messages]) => {
                ;(messages as string[]).forEach(message => toast.error(message))
            },
        )
    } else {
        console.error(error.response || 'error request')
        toast.error(
            error.response?.data?.message ||
                'Something went wrong. Please try again later.',
        )
    }
}
