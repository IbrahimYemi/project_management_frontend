/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import AppLayout from '@/components/app/AppLayout'
import ErrorPage from '@/components/cards/ErrorPage'
import InvitationsTableComponent from '@/components/cards/InviteTable'
import { useInvitedUsers } from '@/hooks/users/useInvitedUsers'
import { useUserInvitedActions } from '@/hooks/users/useUserInvitedActions'
import { useAppDispatch } from '@/store/hooks'
import { setAppState } from '@/store/slices/appStateSlice'
import { useCallback } from 'react'

export default function UsersInviteScreen() {
    const dispatch = useAppDispatch()
    const {
        data: invitations,
        totalPages,
        currentPage,
        setCurrentPage,
        handleSearchQuery,
        setPerPage,
        refetch,
        isLoading,
        isError,
    } = useInvitedUsers()

    const { reinviteUser, deleteUser } = useUserInvitedActions()

    // Function to handle fetching users with pagination
    const handleFetchUsers = useCallback(
        async (page: number, perPage: number) => {
            setPerPage(perPage)
            setCurrentPage(page)
        },
        [],
    )

    const handleSetSearchQuery = async (query: string) => {
        handleSearchQuery(query)
        refetch()
    }

    if (isError) {
        return <ErrorPage />
    }

    const handleInviteActions = (type: 'delete' | 'resend', id: string) => {
        dispatch(setAppState('isRequesting'))
        if (type === 'resend') {
            reinviteUser(id)
        } else {
            deleteUser(id)
        }
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
