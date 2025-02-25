/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import AppLayout from '@/components/app/AppLayout'
import Error from '@/components/cards/error'
import UserManagementTable from '@/components/cards/UsersTable'
import { useUsers } from '@/hooks/users/useUsers'
import { useCallback } from 'react'

export default function UserScreen() {
    const {
        data: users,
        totalPages,
        currentPage,
        setCurrentPage,
        setSearchQuery,
        setPerPage,
        isLoading,
        isError,
    } = useUsers()

    // Function to handle fetching users with pagination
    const handleFetchUsers = useCallback(
        async (page: number, perPage: number) => {
            setPerPage(perPage)
            setCurrentPage(page)
        },
        [],
    )

    const handleSetSearchQuery = useCallback(async (query: string) => {
        setSearchQuery(query)
    }, [])

    if (isError) {
        return <Error />
    }

    const handleUserActions = (
        type: 'delete' | 'restrict' | 'activate',
        id: string,
    ) => {
        console.log(`${type}d the ${id}`)
    }

    return (
        <AppLayout isLoading={isLoading}>
            <UserManagementTable
                users={users}
                currentPage={currentPage}
                totalPages={totalPages}
                perPage={10}
                onFetchUsers={handleFetchUsers}
                onDelete={id => handleUserActions('delete', id)}
                onRestrict={id => handleUserActions('restrict', id)}
                onActivate={id => handleUserActions('activate', id)}
                onSearchQuery={handleSetSearchQuery}
            />
        </AppLayout>
    )
}
