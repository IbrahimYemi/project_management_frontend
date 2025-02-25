/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

interface UsePaginatedQueryProps<T> {
    queryKey: string[]
    fetchFunction: (page: number, perPage: number, search: string) => Promise<T>
    staleTime?: number
}

export function usePaginatedQuery<T>({
    queryKey,
    fetchFunction,
    staleTime = 1000 * 60 * 5,
}: UsePaginatedQueryProps<T>) {
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(20)
    const [searchQuery, setSearchQuery] = useState('')

    const { data, isLoading, isError, refetch } = useQuery<T>({
        queryKey: [queryKey, currentPage, perPage],
        queryFn: () => fetchFunction(currentPage, perPage, searchQuery),
        staleTime,
    })

    return {
        data: (data as any)?.data?.data || [],
        totalPages: (data as any)?.data?.last_page,
        currentPage,
        setCurrentPage,
        perPage,
        setPerPage,
        setSearchQuery,
        isLoading,
        isError,
        refetch,
    }
}
