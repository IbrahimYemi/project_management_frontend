'use client'

import { DateRange } from '@/types/schedule'
import { useState } from 'react'
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker'

interface DateRangePickerProps {
    value?: DateRange
    onChange: (dateRange: DateRange) => void
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
    value,
    onChange,
}) => {
    const today = new Date()

    // Convert DateRange to DateValueType (Ensuring it's Date | null)
    const formatDateForPicker = (dateRange: DateRange): DateValueType => {
        return {
            startDate: dateRange.startDate ?? null, // Keep Date object or null
            endDate: dateRange.endDate ?? null,
        }
    }

    // Convert DateValueType to DateRange
    const parsePickerDate = (dateValue: DateValueType): DateRange => {
        return {
            startDate: dateValue?.startDate
                ? new Date(dateValue.startDate)
                : null,
            endDate: dateValue?.endDate ? new Date(dateValue.endDate) : null,
        }
    }

    const defaultDate: DateValueType = formatDateForPicker(
        value || { startDate: today, endDate: today },
    )

    const [selectedDate, setSelectedDate] = useState<DateValueType>(defaultDate)

    const handleChange = (newValue: DateValueType) => {
        setSelectedDate(newValue)
        onChange(parsePickerDate(newValue)) // Convert back to DateRange
    }

    return (
        <Datepicker
            toggleClassName="absolute bg-teal-700 rounded-r-lg text-white right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            inputClassName="w-full bg-gray-700 text-white border border-gray-500 rounded-md focus:ring-0 font-normal placeholder:text-teal-100 text-white px-3 py-2"
            primaryColor={'emerald'}
            showShortcuts={true}
            configs={{
                shortcuts: {
                    last3Days: {
                        text: 'Last 3 days',
                        period: {
                            start: new Date(
                                new Date().setDate(today.getDate() - 3),
                            ),
                            end: new Date(
                                new Date().setDate(today.getDate() - 1),
                            ),
                        },
                    },
                    yesterday: 'Yesterday',
                    customToday: {
                        text: 'Today',
                        period: {
                            start: today,
                            end: today,
                        },
                    },
                    next8Days: {
                        text: 'Next 8 days',
                        period: {
                            start: new Date(
                                new Date().setDate(today.getDate() + 1),
                            ),
                            end: new Date(
                                new Date().setDate(today.getDate() + 8),
                            ),
                        },
                    },
                },
                footer: {
                    cancel: 'Cancel',
                    apply: 'Apply',
                },
            }}
            value={selectedDate}
            onChange={handleChange}
        />
    )
}

export default DateRangePicker
