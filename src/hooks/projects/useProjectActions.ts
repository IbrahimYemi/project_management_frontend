import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { handleMutationError } from '@/lib/fn/handleMutationError'
import { QUERY_KEYS } from '@/store/constants'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { handleMutationSuccess } from '@/lib/fn/handleMutationSuccess'
import { ApiErrorResponse, ApiNoResponse } from '@/types/generic'
import { setAppState } from '@/store/slices/appStateSlice'
import { CreateProjectParams, Projects } from '@/types/projects'
import {
    createProject,
    deleteProject,
    editProject,
    fetchUserProjects,
    markProjectComplete,
} from '@/lib/fn/projects'

export const useProjectActions = () => {
    const { user } = useAppSelector(state => state.auth)
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()

    const createProjectMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        CreateProjectParams
    >({
        mutationFn: createProject,
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: data => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'Action successful!',
                queryKeys: [QUERY_KEYS.PROJECTS.ALL],
            })
        },
    })

    const editProjectMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        { id: string; data: CreateProjectParams }
    >({
        mutationFn: ({ id, data }) => editProject(data, id),
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: (data, { id }) => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'Action successful!',
                queryKeys: [QUERY_KEYS.PROJECTS.SINGLE, id],
            })
        },
    })

    const deleteProjectMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        string
    >({
        mutationFn: deleteProject,
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: (data, id) => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'Action successful!',
                queryKeys: [QUERY_KEYS.PROJECTS.SINGLE, id],
            })
        },
    })

    const markProjectCompleteMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        string
    >({
        mutationFn: markProjectComplete,
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: data => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'Action successful!',
                queryKeys: [QUERY_KEYS.PROJECTS.ALL],
            })
        },
    })

    const getCurrentUserProjects = useQuery<Projects[]>({
        queryKey: [QUERY_KEYS.PROJECTS.ALL, user?.id],
        queryFn: () => fetchUserProjects(user?.id || ''),
        enabled: !!user?.id,
        retry: 1,
        staleTime: 1000 * 60 * 15,
    })

    return {
        createProject: createProjectMutation.mutate,
        isCreateProjectLoading: createProjectMutation.isPending,
        isCreateProjectError: createProjectMutation.isError,
        isCreateProjectSuccess: createProjectMutation.isSuccess,

        editProject: editProjectMutation.mutate,
        isEditProjectLoading: editProjectMutation.isPending,
        isEditProjectError: editProjectMutation.isError,
        isEditProjectSuccess: editProjectMutation.isSuccess,

        deleteProject: deleteProjectMutation.mutate,
        isDeleteProjectLoading: deleteProjectMutation.isPending,
        isDeleteProjectError: deleteProjectMutation.isError,
        isDeleteProjectSuccess: deleteProjectMutation.isSuccess,

        markProjectComplete: markProjectCompleteMutation.mutate,
        isMarkProjectCompleteLoading: markProjectCompleteMutation.isPending,
        isMarkProjectCompleteError: markProjectCompleteMutation.isError,
        isMarkProjectCompleteSuccess: markProjectCompleteMutation.isSuccess,

        myProjects: getCurrentUserProjects.data,
        isMyProjectsLoading: getCurrentUserProjects.isLoading,
        isMyProjectsError: getCurrentUserProjects.isError,
    }
}
