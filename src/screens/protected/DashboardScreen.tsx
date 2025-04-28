'use client'

import AppLayout from '@/components/app/AppLayout'
import ErrorPage from '@/components/cards/ErrorPage'
import TeamManagementTable from '@/components/cards/TeamsTable'
import { ProjectBarChart } from '@/components/charts/BarChart'
import { ProjectLineChart } from '@/components/charts/LineChart'
import { ProjectPieChart } from '@/components/charts/PieChart'
import { ChartConfig } from '@/components/ui/chart'
import { useTeamActions } from '@/hooks/teams/useTeamActions'
import { useDashboard } from '@/hooks/useDashboard'
import { useAppDispatch } from '@/store/hooks'
import { setAppState } from '@/store/slices/appStateSlice'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

const chartConfig: ChartConfig = {
    name: {
        label: 'Value',
        color: 'hsl(var(--chart-1))',
    },
}

export default function DashboardScreen() {
    const dispatch = useAppDispatch()

    // Default dates (5 months back and current date)
    const defaultFromDate = dayjs()
        .subtract(5, 'months')
        .startOf('day')
        .format('YYYY-MM-DD')
    const defaultToDate = dayjs().format('YYYY-MM-DD')

    const [fromDate, setFromDate] = useState(defaultFromDate)
    const [toDate, setToDate] = useState(defaultToDate)

    // Using the custom hook for dashboard data fetch
    const { data, isLoading, isError, error, refetch } = useDashboard(
        fromDate,
        toDate,
    )
    const { deleteTeam } = useTeamActions()

    const handleDeleteTeam = (id: string) => {
        dispatch(setAppState('isRequesting'))
        deleteTeam(id)
    }

    const handleFilter = () => {
        // Trigger refetch only when the filter button is clicked
        refetch()
    }

    useEffect(() => {
        refetch()
    }, [refetch])

    if (isError) return <ErrorPage error={error} />

    return (
        <AppLayout isLoading={isLoading}>
            {/* Filter UI */}
            <div className="flex flex-wrap items-end gap-4 mb-6 bg-gray-900 p-4 rounded-lg">
                <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-400 mb-1">
                        From
                    </label>
                    <input
                        type="date"
                        value={fromDate}
                        onChange={e => setFromDate(e.target.value)} // Updates the fromDate state
                        className="border border-gray-700 bg-gray-800 text-gray-100 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-400 mb-1">
                        To
                    </label>
                    <input
                        type="date"
                        value={toDate}
                        onChange={e => setToDate(e.target.value)} // Updates the toDate state
                        className="border border-gray-700 bg-gray-800 text-gray-100 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    {/* Invisible label to keep the button aligned */}
                    <label className="text-xs font-semibold text-gray-400 mb-1 invisible">
                        Filter
                    </label>
                    <button
                        onClick={handleFilter} // Refetch when the button is clicked
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-1.5 text-sm font-semibold whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Apply Filter
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {/* Display charts and data */}
                <ProjectPieChart
                    projectData={data?.projects || []}
                    footerText="All projects status"
                />

                <ProjectLineChart
                    title="Project Progress"
                    description="Showing the progress of all projects"
                    chartData={data?.allProjectsData || []}
                    chartConfig={chartConfig}
                    dataKey="value"
                    footerText="Project development progress"
                />

                <ProjectBarChart
                    title="Task Progress"
                    description="Task completion percentages"
                    tasks={data?.tasks || []}
                    baseColor="#c1e899"
                    footerText="Task completion status in percentage"
                />

                <TeamManagementTable
                    teams={data?.teams || []}
                    onDelete={handleDeleteTeam}
                />
            </div>
        </AppLayout>
    )
}
