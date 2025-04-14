import { useMemo, useState } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    ColumnDef,
} from '@tanstack/react-table'
import { CheckCircle, Trash, ChevronDown, ChevronUp } from 'lucide-react'
import { Projects } from '@/types/projects'
import Link from 'next/link'
import EmptyTable from '../cards/EmptyTable'
import clsx from 'clsx'
import DeleteButton from '../ui/DeleteButton'

type ProjectManagementTableProps = {
    projects: Projects[]
    completeFilter?: boolean
    onDelete?: (id: string) => void
    onMarkCompleted?: (id: string) => void
}

const ProjectsTable: React.FC<ProjectManagementTableProps> = ({
    projects,
    completeFilter = true,
    onDelete,
    onMarkCompleted,
}) => {
    const [globalFilter, setGlobalFilter] = useState<string | undefined>(
        undefined,
    )

    const columns = useMemo<ColumnDef<Projects>[]>(
        () => [
            { accessorKey: 'name', header: 'Project Name' },
            { accessorKey: 'team_name', header: 'Owner' },

            {
                accessorKey: 'percentage',
                header: 'Completion',
                cell: ({ row }) => {
                    const percentage = row.original.percentage

                    return (
                        <span
                            className={clsx(
                                'px-2 py-1 text-white text-xs rounded-md',
                                {
                                    'bg-red-500': percentage <= 40,
                                    'bg-yellow-500':
                                        percentage > 40 && percentage <= 70,
                                    'bg-green-500': percentage > 70,
                                },
                            )}
                        >
                            {percentage}%
                        </span>
                    )
                },
            },
            {
                accessorKey: 'is_completed',
                header: 'Status',
                cell: ({ row }) => (
                    <span
                        className={`px-2 py-1 text-white text-xs text-nowrap rounded-md ${
                            row.original.is_completed
                                ? 'bg-green-700'
                                : 'bg-yellow-700'
                        }`}
                    >
                        {row.original.is_completed
                            ? 'Completed'
                            : 'In Progress'}
                    </span>
                ),
            },
            {
                accessorKey: 'status.name',
                header: 'Progress',
                cell: ({ row }) => (
                    <h2 className="flex gap-2">
                        {row.original.status.name}
                        <span
                            className={clsx(
                                'px-2 py-1 text-white text-xs rounded-md',
                                {
                                    'bg-red-500':
                                        row.original.status.percentage <= 40,
                                    'bg-yellow-500':
                                        row.original.status.percentage > 40 &&
                                        row.original.status.percentage <= 70,
                                    'bg-green-500':
                                        row.original.status.percentage > 70,
                                },
                            )}
                        >
                            {row.original.status.percentage}%
                        </span>
                    </h2>
                ),
            },
            {
                id: 'actions',
                header: 'Actions',
                cell: ({ row }) => (
                    <div className="flex gap-2">
                        <Link
                            href={`/projects/${row.original.id}`}
                            className="px-3 py-1 text-sm bg-blue-500 text-white rounded flex items-center justify-center"
                        >
                            View
                        </Link>
                        {completeFilter && (
                            <>
                                <DeleteButton
                                    text={<Trash />}
                                    classNames="px-3 py-1 text-sm bg-red-500 text-white rounded"
                                    onClick={() =>
                                        onDelete && onDelete(row.original.id)
                                    }
                                />
                                <button
                                    className={`px-3 py-1 text-sm ${
                                        row.original.is_completed
                                            ? 'bg-gray-500'
                                            : 'bg-green-500'
                                    } text-white rounded`}
                                    onClick={() =>
                                        onMarkCompleted &&
                                        onMarkCompleted(row.original.id)
                                    }
                                    disabled={row.original.is_completed}
                                >
                                    <CheckCircle />
                                </button>
                            </>
                        )}
                    </div>
                ),
            },
        ],
        [onDelete, onMarkCompleted, completeFilter],
    )

    const table = useReactTable({
        data: projects,
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
                {projects.length < 1 && (
                    <tr>
                        <td colSpan={columns.length}>
                            <EmptyTable<Projects>
                                data={projects}
                                text="No projects available, start creating"
                            />
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default ProjectsTable
