/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import AppLayout from '@/components/app/AppLayout'
import ErrorPage from '@/components/cards/ErrorPage'
import ProjectManagementTable from '@/components/cards/ProjectManagementTable'
import { useProjectActions } from '@/hooks/projects/useProjectActions'
import { useProjects } from '@/hooks/projects/useProjects'
import { useAppDispatch } from '@/store/hooks'
import { setAppState } from '@/store/slices/appStateSlice'
import { useCallback } from 'react'

export default function ProjectsScreen() {
    const dispatch = useAppDispatch()
    const {
        data: projects,
        totalPages,
        currentPage,
        setCurrentPage,
        handleSearchQuery,
        setPerPage,
        isLoading,
        isError,
    } = useProjects()

    const { deleteProject, markProjectComplete } = useProjectActions()

    // Function to handle fetching Projects with pagination
    const handleFetchProjects = useCallback(
        async (page: number, perPage: number) => {
            setPerPage(perPage)
            setCurrentPage(page)
        },
        [],
    )

    const handleSetSearchQuery = useCallback(async (query: string) => {
        handleSearchQuery(query)
    }, [])

    const handleProjectActions = (type: 'complete' | 'delete', id: string) => {
        dispatch(setAppState('isRequesting'))
        if (type === 'complete') {
            markProjectComplete(id)
        } else if (type === 'delete') {
            deleteProject(id)
        }
    }

    if (isError) {
        return <ErrorPage />
    }

    return (
        <AppLayout isLoading={isLoading}>
            <ProjectManagementTable
                projects={projects}
                currentPage={currentPage}
                totalPages={totalPages}
                perPage={10}
                onFetchProjects={handleFetchProjects}
                onMarkCompleted={(id: string) =>
                    handleProjectActions('complete', id)
                }
                onDelete={(id: string) => handleProjectActions('delete', id)}
                onSearchQuery={handleSetSearchQuery}
            />
        </AppLayout>
    )
}
