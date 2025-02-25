/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import AppLayout from '@/components/app/AppLayout'
import Error from '@/components/cards/error'
import InvitationsTableComponent from '@/components/cards/InviteTable'
import { useInvitedUsers } from '@/hooks/users/useInvitedUsers'
import { useCallback } from 'react'

export default function UsersInviteScreen() {
    const {
        data: invitations,
        totalPages,
        currentPage,
        setCurrentPage,
        setSearchQuery,
        setPerPage,
        refetch,
        isLoading,
        isError,
    } = useInvitedUsers()

    // Function to handle fetching users with pagination
    const handleFetchUsers = useCallback(
        async (page: number, perPage: number) => {
            setPerPage(perPage)
            setCurrentPage(page)
        },
        [],
    )

    const handleSetSearchQuery = async (query: string) => {
        setSearchQuery(query)
        refetch()
    }

    if (isError) {
        return <Error />
    }

    const handleInviteActions = (type: 'delete' | 'resend', id: string) => {
        console.log(`${type}d the ${id}`)
    }

    return (
        <AppLayout isLoading={isLoading}>
            <InvitationsTableComponent
                invitations={invitations}
                currentPage={currentPage}
                totalPages={totalPages}
                perPage={10}
                onFetchInvites={handleFetchUsers}
                onDelete={id => handleInviteActions('delete', id)}
                onResend={id => handleInviteActions('resend', id)}
                onSearchQuery={handleSetSearchQuery}
            />
        </AppLayout>
    )
}
