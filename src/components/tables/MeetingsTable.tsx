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
import EmptyTable from '../cards/EmptyTable'
import { Schedule } from '@/types/schedule'
import FormDispatcher from '../ui/FormDispatcher'
import { appStorage } from '@/lib/generic.fn'
import { STORAGE_KEYS } from '@/store/constants'
import DeleteButton from '../ui/DeleteButton'

type TasksTableComponentProps = {
    schedules: Schedule[]
    onDelete?: (id: string) => void
}

const MeetingsTable: React.FC<TasksTableComponentProps> = ({
    schedules,
    onDelete,
}) => {
    const [globalFilter, setGlobalFilter] = useState<string | null>(null)

    const columns = useMemo<ColumnDef<Schedule>[]>(
        () => [
            { accessorKey: 'agenda', header: 'Agenda' },
            { accessorKey: 'date', header: 'Date' },
            { accessorKey: 'time', header: 'Time' },
            {
                accessorKey: 'projectName',
                header: 'Project',
                cell: ({ row }) => row.original.projectName ?? '--',
            },
            {
                accessorKey: 'teamName',
                header: 'team',
                cell: ({ row }) => row.original.teamName ?? '--',
            },
            {
                accessorKey: 'link',
                header: 'Actions',
                cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <a
                            href={row.original.link}
                            target="_blank"
                            className={`p-2 text-sm rounded-md bg-teal-500 text-white`}
                        >
                            view
                        </a>
                        <FormDispatcher
                            text={<h3>Edit</h3>}
                            onOutsideClick={() =>
                                appStorage.persist(
                                    STORAGE_KEYS.RESOURCE_TO_EDIT,
                                    JSON.stringify(row.original),
                                )
                            }
                            type={'edit-schedule'}
                            classNames="bg-emerald-700 flex items-center text-sm text-white rounded-md text-center py-0.5 px-2"
                        />
                        <DeleteButton
                            text="Delete"
                            classNames="px-3 py-1 text-sm bg-red-500 text-white rounded"
                            onClick={() => onDelete?.(row.original.id)}
                        />
                    </div>
                ),
            },
        ],
        [onDelete],
    )

    const table = useReactTable({
        data: schedules,
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
                                onClick={header.column.getToggleSortingHandler()}
                            >
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
                        className="border-b hover:bg-gray-800 text-sm md:text-base"
                    >
                        {row.getVisibleCells().map(cell => (
                            <td
                                key={cell.id}
                                className="md:px-4 px-2 md:py-2 py-1"
                            >
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
                {schedules.length < 1 && (
                    <tr>
                        <td colSpan={7}>
                            <EmptyTable<Schedule>
                                data={schedules}
                                text="No pending schedules"
                            />
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default MeetingsTable
