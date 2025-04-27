'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import { AllProject } from '@/types/dashboard'

const color = '#ffae42' // Use a single color

type ProjectLineChartProps = {
    title: string
    description: string
    chartData: AllProject[]
    chartConfig: ChartConfig
    dataKey: keyof AllProject // Ensures dataKey is a valid key
    footerText: string
}

export function ProjectLineChart({
    title,
    description,
    chartData,
    chartConfig,
    dataKey,
    footerText,
}: ProjectLineChartProps) {
    return (
        <Card className="bg-baseColor">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {chartData.every(item => item.value === 0) ? (
                    <div className="h-40 flex items-center justify-center">
                        <h1 className="text-white text-lg">
                            Empty data, start implementing!
                        </h1>
                    </div>
                ) : (
                    <ChartContainer config={chartConfig}>
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            margin={{ left: 12, right: 12 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="name"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={value => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent indicator="line" />
                                }
                            />
                            <Area
                                dataKey={dataKey}
                                type="natural"
                                fill={color}
                                fillOpacity={0.4}
                                stroke={color}
                            />
                        </AreaChart>
                    </ChartContainer>
                )}
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            {footerText}
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
