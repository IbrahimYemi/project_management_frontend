import { usePaginatedQuery } from '@/hooks/usePaginatedQuery'
import {
    fetchAllUsersData,
    fetchUserData,
    fetchUsersData,
} from '@/lib/fn/users'
import { QUERY_KEYS } from '@/store/constants'
import { User } from '@/types/authTypes'
import { ApiUsersResponse, UserDetails } from '@/types/users'
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
        retry: 1,
    })
}

export function useUserDetails({ id }: { id: string }) {
    return useQuery<UserDetails>({
        queryKey: [QUERY_KEYS.USERS.SINGLE, id],
        queryFn: () => fetchUserData(id),
        staleTime: 1000 * 60 * 5,
        retry: 1,
        enabled: !!id,
    })
}
