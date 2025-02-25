import { ApiErrorResponse, ApiNoResponse } from '@/types/generic'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { toast } from 'react-toastify'
import { handleMutationError } from '@/lib/fn/handleMutationError'
import { inviteUser } from '@/lib/fn/users'
import { InviteUserParam } from '@/types/users'

export const useUserInvite = () => {
    const mutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        InviteUserParam
    >({
        mutationFn: inviteUser,
        onError: handleMutationError,
        onSuccess: data => {
            toast.success(data.message || 'Invite sent!')
        },
    })

    return {
        request: mutation.mutate,
        isRequestLoading: mutation.isPending,
        isRequestError: mutation.isError,
        isRequestSuccess: mutation.isSuccess,
        data: mutation.data,
    }
}
