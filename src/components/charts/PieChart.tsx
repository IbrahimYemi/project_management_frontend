'use client'

import * as React from 'react'
import { Label, Pie, PieChart, Sector } from 'recharts'
import { PieSectorDataItem } from 'recharts/types/polar/Pie'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    ChartConfig,
    ChartContainer,
    ChartStyle,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { Project } from '@/types/dashboard'

const chartConfig = {
    completed: {
        label: 'Completed',
        color: 'hsl(var(--chart-1))',
    },
    'in-progress': {
        label: 'In Progress',
        color: 'hsl(var(--chart-2))',
    },
    'in-review': {
        label: 'In Review',
        color: 'hsl(var(--chart-3))',
    },
    'not-started': {
        label: 'Not Started',
        color: 'hsl(var(--chart-4))',
    },
} satisfies ChartConfig

export function ProjectPieChart({ projectData }: { projectData: Project[] }) {
    const id = 'pie-project-status'
    const [activeProject, setActiveProject] = React.useState(
        projectData[0].name,
    )
    const colors = ['#ffae42', '#c1e899', '#9a6735', '#8a2be2', '#55883b']

    const activeIndex = React.useMemo(
        () => projectData.findIndex(item => item.name === activeProject),
        [activeProject, projectData],
    )

    return (
        <Card data-chart={id} className="flex flex-col bg-baseColor">
            <ChartStyle id={id} config={chartConfig} />
            <CardHeader className="flex-row items-start space-y-0 pb-0">
                <div className="grid gap-1">
                    <CardTitle>Project Status</CardTitle>
                    <CardDescription>
                        Project Completion Overview
                    </CardDescription>
                </div>
                <Select value={activeProject} onValueChange={setActiveProject}>
                    <SelectTrigger
                        className="ml-auto h-7 w-[160px] rounded-md pl-2.5"
                        aria-label="Select a status"
                    >
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent align="end" className="rounded-xl">
                        {projectData.map((item, index) => (
                            <SelectItem
                                key={item.name}
                                value={item.name}
                                className="rounded-md"
                            >
                                <div className="flex items-center gap-2 text-xs">
                                    <span
                                        className="flex h-3 w-3 shrink-0 rounded-md"
                                        style={{
                                            backgroundColor:
                                                colors[index % colors.length],
                                        }}
                                    />
                                    {item.name}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="flex flex-1 justify-center pb-0">
                <ChartContainer
                    id={id}
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[300px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={projectData.map((item, index) => ({
                                ...item,
                                fill: colors[index % colors.length],
                            }))}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={60}
                            strokeWidth={5}
                            activeIndex={activeIndex}
                            activeShape={({
                                outerRadius = 0,
                                ...props
                            }: PieSectorDataItem) => (
                                <g>
                                    <Sector
                                        {...props}
                                        outerRadius={outerRadius + 10}
                                    />
                                    <Sector
                                        {...props}
                                        outerRadius={outerRadius + 25}
                                        innerRadius={outerRadius + 12}
                                    />
                                </g>
                            )}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        'cx' in viewBox &&
                                        'cy' in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {
                                                        projectData[activeIndex]
                                                            .value
                                                    }
                                                    %
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    {
                                                        projectData[activeIndex]
                                                            .name
                                                    }
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
