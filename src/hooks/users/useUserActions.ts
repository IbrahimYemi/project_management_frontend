import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { handleMutationError } from '@/lib/fn/handleMutationError'
import {
    restrictUser,
    activateUser,
    deleteUser,
    changeRole,
    updateUserAvatar,
} from '@/lib/fn/users'
import { QUERY_KEYS, STORAGE_KEYS } from '@/store/constants'
import { useAppDispatch } from '@/store/hooks'
import { handleMutationSuccess } from '@/lib/fn/handleMutationSuccess'
import {
    ApiAuthResponse,
    ApiErrorResponse,
    ApiNoResponse,
} from '@/types/generic'
import { setAppState } from '@/store/slices/appStateSlice'
import { UserActionsType } from '@/types/users'
import { UpdateAvatarParams } from '@/types/authTypes'
import { appStorage } from '@/lib/generic.fn'
import { setUser } from '@/store/slices/authSlice'

export const useUserActions = () => {
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()

    const useCreateMutation = (
        mutationFn: (id: string) => Promise<ApiNoResponse>,
        action: string,
    ) =>
        useMutation<ApiNoResponse, AxiosError<ApiErrorResponse>, string>({
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

    const changeUserRoleMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        { id: string; type: UserActionsType }
    >({
        mutationFn: ({ id, type }) => changeRole(id, type),
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: data => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'Action successful!',
                queryKeys: [QUERY_KEYS.USERS.ALL],
            })
        },
    })

    const useAvatarMutation = (
        mutationFn: (params: UpdateAvatarParams) => Promise<ApiAuthResponse>,
        action: string,
    ) =>
        useMutation<
            ApiAuthResponse,
            AxiosError<ApiErrorResponse>,
            UpdateAvatarParams
        >({
            mutationFn,
            onError: error => {
                dispatch(setAppState('isIdle'))
                handleMutationError(error)
            },
            onSuccess: data => {
                appStorage.persist(
                    STORAGE_KEYS.AUTH_USER,
                    JSON.stringify(data.data) || '',
                )
                dispatch(setUser(data.data))
                handleMutationSuccess({
                    dispatch,
                    queryClient,
                    message: data.message || `${action} successful!`,
                    queryKeys: [QUERY_KEYS.USERS.ALL],
                })
            },
        })

    const restrictMutation = useCreateMutation(restrictUser, 'Restriction')
    const activateMutation = useCreateMutation(activateUser, 'Activation')
    const deleteMutation = useCreateMutation(deleteUser, 'Deletion')
    const updateAvatarMutation = useAvatarMutation(updateUserAvatar, 'Deletion')

    return {
        restrictUser: restrictMutation.mutate,
        isRestrictLoading: restrictMutation.isPending,
        isRestrictError: restrictMutation.isError,
        isRestrictSuccess: restrictMutation.isSuccess,

        activateUser: activateMutation.mutate,
        isActivateLoading: activateMutation.isPending,
        isActivateError: activateMutation.isError,
        isActivateSuccess: activateMutation.isSuccess,

        deleteUser: deleteMutation.mutate,
        isDeleteLoading: deleteMutation.isPending,
        isDeleteError: deleteMutation.isError,
        isDeleteSuccess: deleteMutation.isSuccess,

        changeUserRole: changeUserRoleMutation.mutate,
        isChangeRoleLoading: changeUserRoleMutation.isPending,
        isChangeRoleError: changeUserRoleMutation.isError,
        isChangeRoleSuccess: changeUserRoleMutation.isSuccess,

        updateUserAvatar: updateAvatarMutation.mutate,
        isUpdateUserAvatarLoading: updateAvatarMutation.isPending,
        isUpdateUserAvatarError: updateAvatarMutation.isError,
        isUpdateUserAvatarSuccess: updateAvatarMutation.isSuccess,
    }
}
