'use client'

/* eslint-disable react-hooks/exhaustive-deps */
import AppLayout from '@/components/app/AppLayout'
import ErrorPage from '@/components/cards/ErrorPage'
import TaskManagementTable from '@/components/cards/TaskManagementTable'
import { useTasks } from '@/hooks/tasks/useTasks'
import { useCallback } from 'react'

export default function TasksScreen() {
    const {
        data: tasks,
        totalPages,
        currentPage,
        setCurrentPage,
        handleSearchQuery,
        setPerPage,
        isLoading,
        isError,
    } = useTasks()

    // Function to handle fetching tasks with pagination
    const handleFetchTasks = useCallback(
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

    return (
        <AppLayout isLoading={isLoading}>
            <TaskManagementTable
                tasks={tasks}
                currentPage={currentPage}
                totalPages={totalPages}
                perPage={10}
                onFetchTasks={handleFetchTasks}
                onSearchQuery={handleSetSearchQuery}
            />
        </AppLayout>
    )
}
