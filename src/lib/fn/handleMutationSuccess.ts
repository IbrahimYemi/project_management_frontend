import { toast } from 'react-toastify'
import { QueryClient } from '@tanstack/react-query'
import { setAppState } from '@/store/slices/appStateSlice'
import { AppDispatch } from '@/store/store'

type SuccessHandlerProps = {
    dispatch: AppDispatch
    queryClient?: QueryClient
    message?: string
    queryKeys?: string[]
}

export const handleMutationSuccess = ({
    dispatch,
    queryClient,
    message = 'Action completed successfully!',
    queryKeys = [],
}: SuccessHandlerProps) => {
    dispatch(setAppState('isSuccess'))
    toast.success(message)

    // Invalidate queries if provided
    if (queryClient && queryKeys.length > 0) {
        queryKeys.forEach(key => {
            queryClient.invalidateQueries({ queryKey: [key] })
        })
    }
}
