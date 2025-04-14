/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import AppLayout from '@/components/app/AppLayout'
import ErrorPage from '@/components/cards/ErrorPage'
import { useSchedules } from '@/hooks/schedules/useSchedules'
import { DateRange } from '@/types/schedule'
import React, { useCallback, useState } from 'react'
import Meetings from './Meetings'

export default function CalendarScreen() {
    const today = new Date()
    const [dateRange, setDateRange] = useState<DateRange>({
        startDate: today,
        endDate: today,
    })

    const {
        data: schedules,
        totalPages,
        currentPage,
        setCurrentPage,
        handleSearchQuery,
        setStartDate,
        setEndDate,
        setPerPage,
        isLoading,
        isError,
        refetch,
    } = useSchedules()

    const handleFetchSchedules = useCallback(
        async (page: number, perPage: number) => {
            setPerPage(perPage)
            setCurrentPage(page)
        },
        [],
    )

    const handleSetSearchQuery = async (query: string) => {
        handleSearchQuery(query)
    }

    const handleSearchSchedules = async (
        start: Date | null,
        end: Date | null,
    ) => {
        setStartDate(start)
        setEndDate(end)
        refetch()
    }

    if (isError) return <ErrorPage />

    return (
        <AppLayout isLoading={isLoading}>
            <Meetings
                dateRange={dateRange}
                setDateRange={setDateRange}
                schedules={schedules}
                currentPage={currentPage}
                totalPages={totalPages}
                handleFetchSchedules={handleFetchSchedules}
                handleSetSearchQuery={handleSetSearchQuery}
                handleSearchSchedules={handleSearchSchedules}
            />
        </AppLayout>
    )
}
