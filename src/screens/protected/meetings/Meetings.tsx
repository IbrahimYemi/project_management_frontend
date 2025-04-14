import React from 'react'
import { Calendar1Icon } from 'lucide-react'
import DateRangePicker from '@/components/cards/DateRangePicker'
import ScheduleTableComponent from '@/components/cards/ScheduleTable'
import { DateRange, Schedule } from '@/types/schedule'

type MeetingsProps = {
    dateRange: DateRange
    setDateRange: React.Dispatch<React.SetStateAction<DateRange>>
    schedules: Schedule[]
    currentPage: number
    totalPages: number
    handleFetchSchedules: (page: number, perPage: number) => Promise<void>
    handleSetSearchQuery: (query: string) => Promise<void>
    handleSearchSchedules: (
        start: Date | null,
        end: Date | null,
    ) => Promise<void>
}

export default function Meetings({
    dateRange,
    setDateRange,
    schedules,
    currentPage,
    totalPages,
    handleFetchSchedules,
    handleSetSearchQuery,
    handleSearchSchedules,
}: MeetingsProps) {
    return (
        <div>
            <div className="flex flex-col items-start gap-4 p-2 md:p-4 text-white bg-teal-800 rounded-md mb-5">
                <div className="flex items-start md:items-center gap-2 justify-between w-full">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h1 className="text-lg font-bold">Calendar</h1>
                        {dateRange.startDate && dateRange.endDate && (
                            <p className="text-gray-400">
                                📅{' '}
                                <strong>
                                    {dateRange.startDate.toLocaleDateString()}
                                </strong>{' '}
                                →{' '}
                                <strong>
                                    {dateRange.endDate.toLocaleDateString()}
                                </strong>
                            </p>
                        )}
                    </div>
                    <button
                        onClick={() =>
                            handleSearchSchedules(
                                dateRange.startDate,
                                dateRange.endDate,
                            )
                        }
                        className="bg-teal-500 flex items-center gap-1 text-sm md:text-base text-white rounded-md text-center py-1 px-3"
                    >
                        <Calendar1Icon className="size-3" />{' '}
                        <h3>
                            Load
                            <span className="hidden md:inline-flex">
                                {' '}
                                Schedule
                            </span>
                        </h3>
                    </button>
                </div>

                <DateRangePicker
                    value={dateRange}
                    onChange={range =>
                        setDateRange(
                            range as { startDate: Date; endDate: Date },
                        )
                    }
                />
            </div>

            <ScheduleTableComponent
                schedules={schedules}
                currentPage={currentPage}
                totalPages={totalPages}
                perPage={10}
                onFetchSchedules={handleFetchSchedules}
                onSearchQuery={handleSetSearchQuery}
            />
        </div>
    )
}
