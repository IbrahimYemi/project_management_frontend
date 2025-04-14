import { usePaginatedQuery } from '@/hooks/usePaginatedQuery'
import { fetchInvitedUsersData } from '@/lib/fn/users'
import { QUERY_KEYS } from '@/store/constants'
import { ApiInvitedUsersResponse } from '@/types/users'

export function useInvitedUsers() {
    return usePaginatedQuery<ApiInvitedUsersResponse>({
        queryKey: QUERY_KEYS.USERS.INVITED,
        fetchFunction: fetchInvitedUsersData,
    })
}
