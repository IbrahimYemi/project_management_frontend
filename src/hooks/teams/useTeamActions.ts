import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { handleMutationError } from '@/lib/fn/handleMutationError'
import { QUERY_KEYS } from '@/store/constants'
import { useAppDispatch } from '@/store/hooks'
import { handleMutationSuccess } from '@/lib/fn/handleMutationSuccess'
import { ApiErrorResponse, ApiNoResponse } from '@/types/generic'
import { setAppState } from '@/store/slices/appStateSlice'
import { CreateTeamParams } from '@/types/teams'
import { createTeam, deleteTeam, editTeam } from '@/lib/fn/teams'

export const useTeamActions = () => {
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()

    const createTeamMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        CreateTeamParams
    >({
        mutationFn: createTeam,
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: data => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'Action successful!',
                queryKeys: [QUERY_KEYS.TEAMS.ALL],
            })
        },
    })

    const editTeamMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        { id: string; data: CreateTeamParams }
    >({
        mutationFn: ({ id, data }) => editTeam(data, id),
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: (data, { id }) => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'Action successful!',
                queryKeys: [QUERY_KEYS.TEAMS.SINGLE, id],
            })
        },
    })

    const deleteTeamMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        string
    >({
        mutationFn: deleteTeam,
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: data => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'Action successful!',
                queryKeys: [QUERY_KEYS.TEAMS.ALL],
            })
        },
    })

    return {
        createTeam: createTeamMutation.mutate,
        isCreateTeamLoading: createTeamMutation.isPending,
        isCreateTeamError: createTeamMutation.isError,
        isCreateTeamSuccess: createTeamMutation.isSuccess,

        deleteTeam: deleteTeamMutation.mutate,
        isDeleteTeamLoading: deleteTeamMutation.isPending,
        isDeleteTeamError: deleteTeamMutation.isError,
        isDeleteTeamSuccess: deleteTeamMutation.isSuccess,

        editTeam: editTeamMutation.mutate,
        isEditTeamLoading: editTeamMutation.isPending,
        isEditTeamError: editTeamMutation.isError,
        isEditTeamSuccess: editTeamMutation.isSuccess,
    }
}
