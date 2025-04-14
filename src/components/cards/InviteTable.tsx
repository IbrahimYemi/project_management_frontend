/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    ColumnDef,
} from '@tanstack/react-table'
import {
    ChevronDown,
    ChevronUp,
    PlusCircleIcon,
    RotateCcw,
    Trash,
} from 'lucide-react'
import SearchInput from './SearchInput'
import { Invitation } from '@/types/users'
import EmptyTable from './EmptyTable'
import { STORAGE_KEYS } from '@/store/constants'
import PaginationControl from './PaginationControl'
import FormDispatcher from '../ui/FormDispatcher'
import DeleteButton from '../ui/DeleteButton'

type InvitationsTableComponentProps = {
    invitations: Invitation[]
    currentPage: number
    totalPages: number
    perPage: number
    onDelete: (id: string) => void
    onResend: (id: string) => void
    onSearchQuery: (searchQuery: string) => Promise<void>
    onFetchInvites: (page: number, perPage: number) => void
}

const InvitationsTableComponent: React.FC<InvitationsTableComponentProps> = ({
    invitations,
    currentPage,
    totalPages,
    perPage,
    onFetchInvites,
    onDelete,
    onResend,
    onSearchQuery,
}) => {
    const [globalFilter, setGlobalFilter] = useState<string | undefined>(
        undefined,
    )

    const columns = useMemo<ColumnDef<Invitation>[]>(
        () => [
            { accessorKey: 'name', header: 'Name' },
            { accessorKey: 'email', header: 'Email' },
            { accessorKey: 'token', header: 'Token' },
            {
                accessorKey: 'is_accepted',
                header: 'Status',
                cell: ({ row }) => (
                    <span
                        className={`px-2 py-1 text-xs rounded-md ${
                            row.original.is_accepted
                                ? 'bg-green-500 text-white'
                                : 'bg-red-500 text-white'
                        }`}
                    >
                        {row.original.is_accepted ? 'Accepted' : 'Pending'}
                    </span>
                ),
            },
            {
                id: 'actions',
                header: 'Actions',
                cell: ({ row }) => (
                    <div className="flex gap-2">
                        {row.original.is_accepted ? (
                            <button
                                disabled
                                className="px-3 py-1 text-sm bg-gray-500 text-white rounded"
                            >
                                <RotateCcw size={16} />
                            </button>
                        ) : (
                            <button
                                className="px-3 py-1 text-sm bg-teal-700 text-white rounded"
                                onClick={() => onResend(row.original.id)}
                            >
                                <RotateCcw size={16} />
                            </button>
                        )}
                        <DeleteButton
                            classNames="px-3 py-1 text-sm bg-red-500 text-white rounded"
                            onClick={() => onDelete(row.original.id)}
                            text={<Trash size={16} />}
                            confirmStatement="Are you sure you want to delete this invitation?"
                        />
                    </div>
                ),
            },
        ],
        [],
    )

    const table = useReactTable({
        data: invitations,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
    })

    return (
        <div className="p-2 md:p-6 bg-baseColor w-full text-white rounded-md shadow-md">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                    Invitations Management
                </h2>
                <FormDispatcher
                    text={
                        <>
                            <PlusCircleIcon className="size-3" />
                            <h3>Invite</h3>
                        </>
                    }
                    type={'users-invite'}
                    classNames="bg-emerald-600 flex items-center gap-1 text-sm md:text-base text-white rounded-md text-center py-1 px-3"
                />
            </div>
            <div className="flex items-center bg-gray-700 md:w-2/5 mb-2 text-baseText border rounded">
                <SearchInput
                    onSearch={onSearchQuery}
                    storageKey={STORAGE_KEYS.INVITE_SEARCH_INPUT}
                />
            </div>
            <div className="w-full overflow-x-auto">
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
                        {invitations.length < 1 && (
                            <tr>
                                <td colSpan={4}>
                                    <EmptyTable<Invitation>
                                        data={invitations}
                                        text="No pending invitations"
                                    />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination Component */}
            <PaginationControl
                currentPage={currentPage}
                totalPages={totalPages}
                perPage={perPage}
                onPageChange={onFetchInvites}
            />
        </div>
    )
}

export default InvitationsTableComponent
