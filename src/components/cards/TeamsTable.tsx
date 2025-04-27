import { useMemo, useState } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    flexRender,
    ColumnDef,
} from '@tanstack/react-table'
import { ChevronDown, ChevronUp, PlusSquareIcon } from 'lucide-react'
import EmptyTable from './EmptyTable'
import { Team } from '@/types/teams'
import Link from 'next/link'
import DeleteButton from '../ui/DeleteButton'
import FormDispatcher from '../ui/FormDispatcher'

type TeamManagementTableProps = {
    teams: Team[]
    onDelete: (id: string) => void
}

const TeamManagementTable: React.FC<TeamManagementTableProps> = ({
    teams,
    onDelete,
}) => {
    const [globalFilter, setGlobalFilter] = useState<string>('')

    const columns = useMemo<ColumnDef<Team>[]>(
        () => [
            { accessorKey: 'name', header: 'Team Name' },
            { accessorKey: 'teamLead', header: 'Team Lead' },
            { accessorKey: 'members', header: 'Members' },
            { accessorKey: 'projectCount', header: 'Projects' },
            {
                id: 'actions',
                header: 'Actions',
                cell: ({ row }) => (
                    <div className="flex gap-2">
                        <Link
                            href={`/teams/${row.original.id}`}
                            className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                        >
                            View
                        </Link>
                        <DeleteButton
                            text="Delete"
                            classNames="px-3 py-1 text-sm bg-red-500 text-white rounded"
                            onClick={() => onDelete(row.original.id)}
                        />
                    </div>
                ),
            },
        ],
        [onDelete],
    )

    const table = useReactTable({
        data: teams,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
    })

    return (
        <div className="p-2 md:p-4 bg-baseColor w-full text-white rounded-md shadow-md">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Team Management</h2>
                <FormDispatcher
                    text={
                        <>
                            <PlusSquareIcon className="size-3" />
                            <h3>create</h3>
                        </>
                    }
                    type={'create-team'}
                    classNames="bg-emerald-700 flex items-center gap-1 text-sm md:text-base text-white rounded-md text-center py-0.5 px-2"
                />
            </div>
            <input
                type="text"
                value={globalFilter}
                onChange={e => setGlobalFilter(e.target.value)}
                placeholder="Search..."
                className="mb-4 px-3 py-2 border rounded-md text-baseText bg-gray-700 w-full md:w-2/5"
            />
            <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse min-w-[600px]">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="bg-gray-700">
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="px-4 py-2 text-left border-b cursor-pointer"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        <div className="flex items-center gap-1">
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                            <span className="flex flex-col items-center">
                                                <ChevronUp className="size-2 text-brand m-0" />{' '}
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
                                className="border-b hover:bg-gray-800"
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-4 py-2">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {teams.length < 1 && (
                            <tr>
                                <td colSpan={columns.length}>
                                    <EmptyTable<Team>
                                        data={teams}
                                        text="No teams available, start creating"
                                    />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TeamManagementTable
