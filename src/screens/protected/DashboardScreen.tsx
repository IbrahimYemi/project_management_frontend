'use client'

import AppLayout from '@/components/app/AppLayout'
import TeamManagementTable from '@/components/cards/TeamsTable'
import { ProjectBarChart } from '@/components/charts/BarChart'
import { ProjectLineChart } from '@/components/charts/LineChart'
import { ProjectPieChart } from '@/components/charts/PieChart'
import { ChartConfig } from '@/components/ui/chart'
import { useDashboard } from '@/hooks/useDashboard'

const chartConfig: ChartConfig = {
    name: {
        label: 'Value',
        color: 'hsl(var(--chart-1))',
    },
}

export default function DashboardScreen() {
    const { data, isLoading } = useDashboard()

    return (
        <AppLayout isLoading={isLoading}>
            <div className="grid grid-cols-1 gap-4">
                {/* Project Charts */}
                <ProjectPieChart projectData={data?.projects || []} />

                <ProjectLineChart
                    title="Project Progress"
                    description="Showing the progress of all projects"
                    chartData={data?.allProjectsData || []}
                    chartConfig={chartConfig}
                    dataKey="value"
                    footerText="Project development progress"
                />

                {/* Task Progress Chart */}
                <ProjectBarChart
                    title="Task Progress"
                    description="Task completion percentages"
                    tasks={data?.tasks || []}
                    baseColor="#c1e899"
                    footerText="Task completion status in percentage"
                />

                {/* team list table */}
                <TeamManagementTable teams={data?.teams || []} />
            </div>
        </AppLayout>
    )
}
