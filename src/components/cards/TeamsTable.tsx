import { useMemo, useState } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    flexRender,
    ColumnDef,
} from '@tanstack/react-table'
import { Team } from '@/types/dashboard'
import { ChevronDown, ChevronUp } from 'lucide-react'
import EmptyTable from './EmptyTable'

type TeamManagementTableProps = {
    teams: Team[]
}

const TeamManagementTable: React.FC<TeamManagementTableProps> = ({ teams }) => {
    const [globalFilter, setGlobalFilter] = useState<string | undefined>(
        undefined,
    )

    const columns = useMemo<ColumnDef<Team>[]>(
        () => [
            { accessorKey: 'name', header: 'Team Name' },
            { accessorKey: 'teamLead', header: 'Team Lead' },
            { accessorKey: 'members', header: 'Members' },
            { accessorKey: 'projectCount', header: 'Projects' },
            {
                id: 'actions',
                header: 'Actions',
                cell: () => (
                    <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">
                            Edit
                        </button>
                        <button className="px-3 py-1 text-sm bg-red-500 text-white rounded">
                            Delete
                        </button>
                    </div>
                ),
            },
        ],
        [],
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
        <div className="p-6 bg-baseColor w-full text-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Team Management</h2>
            <input
                type="text"
                value={globalFilter}
                onChange={e => setGlobalFilter(e.target.value)}
                placeholder="Search..."
                className="mb-4 px-3 py-2 border rounded text-baseText bg-gray-700"
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
                                <td colSpan={4}>
                                    <EmptyTable<Team>
                                        data={teams}
                                        text="No teams available, start inviting"
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
