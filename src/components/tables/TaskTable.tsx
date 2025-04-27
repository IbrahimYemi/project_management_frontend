'use client'

import { useMemo, useState } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    ColumnDef,
} from '@tanstack/react-table'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { TaskType } from '@/types/tasks'
import EmptyTable from '../cards/EmptyTable'
import Avatar from '../ui/Avatar'
import Link from 'next/link'
import clsx from 'clsx'
import Badge from '../ui/Badge'

type TasksTableComponentProps = {
    tasks: TaskType[]
}

const TaskTable: React.FC<TasksTableComponentProps> = ({ tasks }) => {
    const [globalFilter, setGlobalFilter] = useState<string | null>(null)

    const columns = useMemo<ColumnDef<TaskType>[]>(
        () => [
            {
                accessorKey: 'owner',
                header: 'Owner',
                cell: ({ row }) => (
                    <Link
                        href={`/users/${row.original.owner.id}/view`}
                        className="flex items-center space-x-1 relative">
                        <Avatar
                            userImage={row.original.owner.avatar}
                            username={row.original.owner.name}
                        />
                        <div>
                            <p className="font-medium">
                                {row.original.owner.name}
                            </p>
                            <p className="text-xs">
                                {row.original.owner.email}
                            </p>
                        </div>
                    </Link>
                ),
            },
            { accessorKey: 'name', header: 'Task' },
            { accessorKey: 'project.name', header: 'Project' },
            { accessorKey: 'startDate', header: 'Start' },
            { accessorKey: 'dueDate', header: 'Due' },
            {
                accessorKey: 'priority',
                header: 'Priority',
                cell: ({ row }) => <Badge priority={row.original.priority} />,
            },
            { accessorKey: 'status.name', header: 'Status' },
            {
                accessorKey: 'percentage',
                header: 'Completion',
                cell: ({ row }) => {
                    const percentage = row.original.percentage
                    return (
                        <span
                            className={clsx(
                                'px-3 py-2 text-white text-xs rounded-md',
                                {
                                    'bg-red-500': percentage <= 40,
                                    'bg-yellow-500':
                                        percentage > 40 && percentage <= 70,
                                    'bg-green-500': percentage > 70,
                                },
                            )}>
                            {percentage}%
                        </span>
                    )
                },
            },
            {
                accessorKey: 'id',
                header: 'View',
                cell: ({ row }) => (
                    <Link
                        href={`/tasks/${row.original.id}`}
                        className={`px-3 py-2 text-xs rounded-md bg-teal-500 text-white`}>
                        view
                    </Link>
                ),
            },
        ],
        [],
    )

    const table = useReactTable({
        data: tasks,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
    })

    return (
        <table className="w-full border-collapse min-w-[600px]">
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} className="bg-gray-700">
                        {headerGroup.headers.map(header => (
                            <th
                                key={header.id}
                                className="md:px-4 px-2 md:py-2 py-1 text-left border-b cursor-pointer"
                                onClick={header.column.getToggleSortingHandler()}>
                                <div className="flex items-center gap-1">
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                    )}
                                    <span className="flex flex-col items-center">
                                        <ChevronUp className="size-2 text-brand m-0" />
                                        <ChevronDown className="size-2 text-brand m-0" />
                                    </span>
                                </div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr
                        key={row.id}
                        className="border-b hover:bg-gray-800 text-sm md:text-base">
                        {row.getVisibleCells().map(cell => (
                            <td
                                key={cell.id}
                                className="md:px-4 px-2 md:py-2 py-1 min-w-32">
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
                {tasks.length < 1 && (
                    <tr>
                        <td colSpan={columns.length}>
                            <EmptyTable<TaskType>
                                data={tasks}
                                text="No tasks available"
                            />
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default TaskTable
