import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { handleMutationError } from '@/lib/fn/handleMutationError'
import { QUERY_KEYS } from '@/store/constants'
import { useAppDispatch } from '@/store/hooks'
import { handleMutationSuccess } from '@/lib/fn/handleMutationSuccess'
import {
    ApiErrorResponse,
    ApiNoResponse,
    ApiSuccessResponse,
} from '@/types/generic'
import { setAppState } from '@/store/slices/appStateSlice'
import {
    CreateTaskFileParams,
    CreateTaskParams,
    DiscussionParams,
} from '@/types/tasks'
import {
    createDiscussion,
    createFile,
    createTask,
    deleteDiscussion,
    deleteFile,
    deleteTask,
    editTask,
    markTaskComplete,
    updateStatus,
} from '@/lib/fn/tasks'

export const useTaskActions = () => {
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()

    const createTaskMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        { params: CreateTaskParams }
    >({
        mutationFn: ({ params }) => createTask(params),
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: (data, { params }) => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'Action successful!',
                queryKeys: [QUERY_KEYS.TASKS.ALL, params.project_id],
            })
        },
    })

    const editTaskMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        { id: string; data: CreateTaskParams }
    >({
        mutationFn: ({ id, data }) => editTask(data, id),
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: (data, { id }) => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'Action successful!',
                queryKeys: [QUERY_KEYS.TASKS.SINGLE, id],
            })
        },
    })

    const deleteTaskMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        { id: string; projectId: string }
    >({
        mutationFn: ({ id }) => deleteTask(id),
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: (data, { projectId }) => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'Action successful!',
                queryKeys: [QUERY_KEYS.PROJECTS.SINGLE, projectId],
            })
        },
    })

    const markTaskCompleteMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        string
    >({
        mutationFn: markTaskComplete,
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

    const createFileMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        { params: CreateTaskFileParams }
    >({
        mutationFn: ({ params }) => createFile(params),
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: (data, { params }) => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'Action successful!',
                queryKeys: [QUERY_KEYS.TASKS.SINGLE, params.task_id],
            })
        },
    })

    const deleteTaskFileMutation = useMutation<
        ApiSuccessResponse,
        AxiosError<ApiErrorResponse>,
        { id: string }
    >({
        mutationFn: ({ id }) => deleteFile(id),
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: (data, { id }) => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'Action successful!',
                queryKeys: [QUERY_KEYS.TASKS.SINGLE, id],
            })
        },
    })

    const createDiscussionMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        { params: DiscussionParams }
    >({
        mutationFn: ({ params }) => createDiscussion(params),
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: (data, { params }) => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'Action successful!',
                queryKeys: [QUERY_KEYS.TASKS.SINGLE, params.task_id],
            })
        },
    })

    const deleteDiscussionMutation = useMutation<
        ApiSuccessResponse,
        AxiosError<ApiErrorResponse>,
        { id: string }
    >({
        mutationFn: ({ id }) => deleteDiscussion(id),
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: (data, { id }) => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'Action successful!',
                queryKeys: [QUERY_KEYS.TASKS.SINGLE, id],
            })
        },
    })

    const updateTaskStatusMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        { id: string; statusId: string; projectId: string }
    >({
        mutationFn: ({ id, statusId }) => updateStatus(id, statusId),
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: (data, { projectId }) => {
            dispatch(setAppState('isSuccess'))
            console.log(QUERY_KEYS.PROJECTS.SINGLE, projectId)
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.PROJECTS.SINGLE, projectId],
            })
        },
    })

    return {
        createTask: createTaskMutation.mutate,
        isCreateTaskLoading: createTaskMutation.isPending,
        isCreateTaskError: createTaskMutation.isError,
        isCreateTaskSuccess: createTaskMutation.isSuccess,

        deleteTask: deleteTaskMutation.mutate,
        isDeleteTaskLoading: deleteTaskMutation.isPending,
        isDeleteTaskError: deleteTaskMutation.isError,
        isDeleteTaskSuccess: deleteTaskMutation.isSuccess,

        editTask: editTaskMutation.mutate,
        isEditTaskLoading: editTaskMutation.isPending,
        isEditTaskError: editTaskMutation.isError,
        isEditTaskSuccess: editTaskMutation.isSuccess,

        markTaskComplete: markTaskCompleteMutation.mutate,
        isMarkTaskCompleteLoading: markTaskCompleteMutation.isPending,
        isMarkTaskCompleteError: markTaskCompleteMutation.isError,
        isMarkTaskCompleteSuccess: markTaskCompleteMutation.isSuccess,

        createTaskFile: createFileMutation.mutate,
        isCreateTaskFileLoading: createFileMutation.isPending,
        isCreateTaskFileError: createFileMutation.isError,
        isCreateTaskFileSuccess: createFileMutation.isSuccess,

        deleteTaskFile: deleteTaskFileMutation.mutate,

        createDiscussion: createDiscussionMutation.mutate,
        isCreateDiscussionLoading: createDiscussionMutation.isPending,
        isCreateDiscussionError: createDiscussionMutation.isError,
        isCreateDiscussionSuccess: createDiscussionMutation.isSuccess,

        deleteDiscussion: deleteDiscussionMutation.mutate,

        updateTaskStatus: updateTaskStatusMutation.mutate,
    }
}
