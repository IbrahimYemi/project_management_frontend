import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { handleMutationError } from '@/lib/fn/handleMutationError'
import { QUERY_KEYS } from '@/store/constants'
import { useAppDispatch } from '@/store/hooks'
import { handleMutationSuccess } from '@/lib/fn/handleMutationSuccess'
import { ApiErrorResponse, ApiNoResponse } from '@/types/generic'
import { setAppState } from '@/store/slices/appStateSlice'
import { createNote, deleteNote, editNote } from '@/lib/fn/notes'
import { CreateNoteParams } from '@/types/notes'

export const useNoteActions = () => {
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()

    const createNoteMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        CreateNoteParams
    >({
        mutationFn: createNote,
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: data => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'Action successful!',
                queryKeys: [QUERY_KEYS.NOTES],
            })
        },
    })

    const editNoteMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        { id: string; data: CreateNoteParams }
    >({
        mutationFn: ({ id, data }) => editNote(data, id),
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: data => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'Action successful!',
                queryKeys: [QUERY_KEYS.NOTES],
            })
        },
    })

    const deleteNoteMutation = useMutation<
        ApiNoResponse,
        AxiosError<ApiErrorResponse>,
        string
    >({
        mutationFn: deleteNote,
        onError: error => {
            dispatch(setAppState('isIdle'))
            handleMutationError(error)
        },
        onSuccess: data => {
            handleMutationSuccess({
                dispatch,
                queryClient,
                message: data.message || 'Action successful!',
                queryKeys: [QUERY_KEYS.NOTES],
            })
        },
    })

    return {
        createNote: createNoteMutation.mutate,
        isCreateNoteLoading: createNoteMutation.isPending,
        isCreateNoteError: createNoteMutation.isError,
        isCreateNoteSuccess: createNoteMutation.isSuccess,

        deleteNote: deleteNoteMutation.mutate,
        isDeleteNoteLoading: deleteNoteMutation.isPending,
        isDeleteNoteError: deleteNoteMutation.isError,
        isDeleteNoteSuccess: deleteNoteMutation.isSuccess,

        editNote: editNoteMutation.mutate,
        isEditNoteLoading: editNoteMutation.isPending,
        isEditNoteError: editNoteMutation.isError,
        isEditNoteSuccess: editNoteMutation.isSuccess,
    }
}
