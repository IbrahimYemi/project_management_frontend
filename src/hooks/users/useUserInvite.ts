import { ApiErrorResponse, ApiNoResponse } from '@/types/generic'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { handleMutationError } from '@/lib/fn/handleMutationError'
import { inviteUser } from '@/lib/fn/users'
import { InviteUserParam } from '@/types/users'
import { QUERY_KEYS } from '@/store/constants'

export const useUserInvite = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        InviteUserParam
    >({
        mutationFn: inviteUser,
        onError: handleMutationError,
        onSuccess: data => {
            toast.success(data.message || 'Invite sent!')

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.USERS.INVITED],
            })
        },
    })

    return {
        inviteUser: mutation.mutate,
        isInviteLoading: mutation.isPending,
        isInviteError: mutation.isError,
        isInviteSuccess: mutation.isSuccess,
        data: mutation.data,
    }
}
