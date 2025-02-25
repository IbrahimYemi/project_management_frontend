import { usePaginatedQuery } from '@/hooks/usePaginatedQuery'
import { fetchUsersData } from '@/lib/fn/users'
import { ALL_USERS_QUERY_KEY } from '@/store/constants'
import { ApiUsersResponse } from '@/types/users'

export function useUsers() {
    return usePaginatedQuery<ApiUsersResponse>({
        queryKey: ALL_USERS_QUERY_KEY,
        fetchFunction: fetchUsersData,
    })
}
