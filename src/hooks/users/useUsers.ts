import { usePaginatedQuery } from '@/hooks/usePaginatedQuery'
import { fetchAllUsersData, fetchUsersData } from '@/lib/fn/users'
import { QUERY_KEYS } from '@/store/constants'
import { User } from '@/types/authTypes'
import { ApiUsersResponse } from '@/types/users'
import { useQuery } from '@tanstack/react-query'

export function useUsers() {
    return usePaginatedQuery<ApiUsersResponse>({
        queryKey: QUERY_KEYS.USERS.ALL,
        fetchFunction: fetchUsersData,
    })
}

export function useAllUsers() {
    return useQuery<User[]>({
        queryKey: [QUERY_KEYS.USERS.GENERAL],
        queryFn: fetchAllUsersData,
        staleTime: 1000 * 60 * 5,
    })
}
