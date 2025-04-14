/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

interface UsePaginatedQueryProps<T> {
    queryKey: string
    fetchFunction: (
        page: number,
        perPage: number,
        search: string,
        start?: Date | null,
        end?: Date | null,
        resourceId?: string,
    ) => Promise<T>
    resourceId?: string
    staleTime?: number
}

export function usePaginatedQuery<T>({
    queryKey,
    fetchFunction,
    staleTime = 1000 * 60 * 5,
    resourceId,
}: UsePaginatedQueryProps<T>) {
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [searchQuery, setSearchQuery] = useState('')
    const [start, setStartDate] = useState<Date | null>(null)
    const [end, setEndDate] = useState<Date | null>(null)

    const { data, isLoading, isError, refetch } = useQuery<T>({
        queryKey: [
            queryKey,
            currentPage,
            perPage,
            searchQuery,
            start,
            end,
            resourceId,
        ],
        queryFn: () =>
            fetchFunction(
                currentPage,
                perPage,
                searchQuery,
                start,
                end,
                resourceId,
            ),
        staleTime,
    })

    const handleSearchQuery = (query: string) => {
        console.log('initial', currentPage, searchQuery)
        setSearchQuery(query)
        setCurrentPage(1)
        console.log('before', currentPage, searchQuery)
        refetch()
        console.log('after', currentPage, searchQuery)
    }

    return {
        data: (data as any)?.data?.data || [],
        totalPages: (data as any)?.data?.last_page,
        currentPage,
        setCurrentPage,
        perPage,
        setPerPage,
        handleSearchQuery,
        setStartDate,
        setEndDate,
        isLoading,
        isError,
        refetch,
    }
}
