/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import AppLayout from '@/components/app/AppLayout'
import Error from '@/components/cards/error'
import ProjectManagementTable from '@/components/cards/ProjectsTable'
import { useProjects } from '@/hooks/projects/useProjects'
import { useCallback } from 'react'

export default function ProjectsScreen() {
    const {
        data: projects,
        totalPages,
        currentPage,
        setCurrentPage,
        setSearchQuery,
        setPerPage,
        isLoading,
        isError,
    } = useProjects()

    // Function to handle fetching Projects with pagination
    const handleFetchProjects = useCallback(
        async (page: number, perPage: number) => {
            setPerPage(perPage)
            setCurrentPage(page)
        },
        [],
    )

    const handleSetSearchQuery = useCallback(async (query: string) => {
        setSearchQuery(query)
    }, [])

    const handleProjectActions = (type: 'complete', id: string) => {
        console.log(`${type}d the ${id}`)
    }

    if (isError) {
        return <Error />
    }

    return (
        <AppLayout isLoading={isLoading}>
            <ProjectManagementTable
                projects={projects}
                currentPage={currentPage}
                totalPages={totalPages}
                perPage={10}
                onFetchProjects={handleFetchProjects}
                onMarkCompleted={id => handleProjectActions('complete', id)}
                onSearchQuery={handleSetSearchQuery}
            />
        </AppLayout>
    )
}
