import { useQuery } from '@tanstack/react-query'
import { fetchAuthUser } from '@/lib/fn/auth'
import { User } from '@/types/authTypes'
import { AUTH_USER_QUERY_KEY } from '@/store/constants'

export const useAuthUser = () => {
    return useQuery<User>({
        queryKey: AUTH_USER_QUERY_KEY,
        queryFn: fetchAuthUser,
        retry: 1,
        staleTime: 1000 * 60 * 15,
    })
}
