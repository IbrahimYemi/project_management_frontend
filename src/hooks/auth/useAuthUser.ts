import { useQuery } from '@tanstack/react-query'
import { fetchAuthUser } from '@/lib/fn/auth'
import { User } from '@/types/authTypes'
import { QUERY_KEYS } from '@/store/constants'

export const useAuthUser = () => {
    return useQuery<User>({
        queryKey: [QUERY_KEYS.AUTH_USER],
        queryFn: fetchAuthUser,
        retry: 1,
        staleTime: 1000 * 60 * 15,
    })
}
