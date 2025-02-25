import { usePaginatedQuery } from '@/hooks/usePaginatedQuery'
import { fetchInvitedUsersData } from '@/lib/fn/users'
import { INVITED_USERS_QUERY_KEY } from '@/store/constants'
import { ApiInvitedUsersResponse } from '@/types/users'

export function useInvitedUsers() {
    return usePaginatedQuery<ApiInvitedUsersResponse>({
        queryKey: INVITED_USERS_QUERY_KEY,
        fetchFunction: fetchInvitedUsersData,
    })
}
