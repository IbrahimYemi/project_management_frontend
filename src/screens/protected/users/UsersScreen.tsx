/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import AppLayout from '@/components/app/AppLayout'
import ErrorPage from '@/components/cards/ErrorPage'
import UserManagementTable from '@/components/cards/UsersTable'
import { useUserActions } from '@/hooks/users/useUserActions'
import { useUsers } from '@/hooks/users/useUsers'
import { useAppDispatch } from '@/store/hooks'
import { setAppState } from '@/store/slices/appStateSlice'
import { UserActionsType } from '@/types/users'
import { useCallback } from 'react'

export default function UserScreen() {
    const dispatch = useAppDispatch()
    const {
        data: users,
        totalPages,
        currentPage,
        setCurrentPage,
        handleSearchQuery,
        setPerPage,
        isLoading,
        isError,
    } = useUsers()

    const { restrictUser, activateUser, deleteUser, changeUserRole } =
        useUserActions()

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
    }

    if (isError) {
        return <ErrorPage />
    }

    const handleUserActions = (type: UserActionsType, id: string) => {
        dispatch(setAppState('isRequesting'))
        if (type === 'restrict') {
            restrictUser(id)
        } else if (type === 'activate') {
            activateUser(id)
        } else if (type === 'make-admin') {
            changeUserRole({ id, type })
        } else if (type === 'make-teamlead') {
            changeUserRole({ id, type })
        } else if (type === 'make-member') {
            changeUserRole({ id, type })
        } else {
            deleteUser(id)
        }
    }

    return (
        <AppLayout isLoading={isLoading}>
            <UserManagementTable
                users={users}
                currentPage={currentPage}
                totalPages={totalPages}
                perPage={10}
                onFetchUsers={handleFetchUsers}
                handleUserActions={(type, id) => handleUserActions(type, id)}
                onSearchQuery={handleSetSearchQuery}
            />
        </AppLayout>
    )
}
