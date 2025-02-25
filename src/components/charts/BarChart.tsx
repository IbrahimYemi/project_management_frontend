'use client'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import { Task } from '@/types/dashboard'

type ProjectBarChartProps = {
    title: string
    description: string
    tasks: Task[]
    baseColor: string
    footerText: string
}

export function ProjectBarChart({
    title,
    description,
    tasks,
    baseColor,
    footerText,
}: ProjectBarChartProps) {
    return (
        <Card className="bg-baseColor">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}}>
                    <BarChart accessibilityLayer data={tasks}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="value" radius={8} fill={baseColor} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    {footerText}
                </div>
            </CardFooter>
        </Card>
    )
}
