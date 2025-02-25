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
    ArrowLeft,
    ArrowRight,
    ChevronDown,
    ChevronUp,
    PlusCircleIcon,
    RotateCcw,
    Trash2,
} from 'lucide-react'
import SearchInput from './SearchInput'
import { Invitation } from '@/types/users'
import EmptyTable from './EmptyTable'
import { INVITE_SEARCH_INPUT_STORAGE_KEY } from '@/store/constants'

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
                        className={`px-2 py-1 text-xs rounded ${
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
                        <button
                            className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                            onClick={() => onDelete(row.original.id)}
                        >
                            <Trash2 size={16} />
                        </button>
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
                <h2 className="text-xl font-semibold mb-4">
                    Invitations Management
                </h2>
                <button className="bg-brand flex items-center gap-1 text-sm md:text-base text-white rounded-md text-center py-0.5 px-2">
                    <PlusCircleIcon className="size-3" /> <h3>Invite</h3>
                </button>
            </div>
            <div className="flex items-center bg-gray-700 md:w-2/5 mb-2 text-baseText border rounded">
                <SearchInput
                    onSearch={onSearchQuery}
                    storageKey={INVITE_SEARCH_INPUT_STORAGE_KEY}
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
            {/* Pagination Controls */}
            <div className="flex flex-col md:flex-row items-start md:justify-between md:items-center mt-4 text-xs md:text-sm gap-2 p-2 md:p-4 border-t">
                {/* Left: Page Details & Per Page Selection */}
                <div className="flex items-center space-x-4">
                    <span className="text-titleText">
                        Page {currentPage} of {totalPages}
                    </span>
                </div>

                {/* Right: Pagination Controls */}
                <div className="flex items-center space-x-2">
                    {/* Previous Button */}
                    <button
                        disabled={currentPage === 1}
                        onClick={() => onFetchInvites(currentPage - 1, perPage)}
                        className="md:px-4 px-2 md:py-2 py-1 bg-gray-600 text-white rounded disabled:bg-gray-300"
                    >
                        <ArrowLeft />
                    </button>

                    {/* Page Numbers with Dynamic Display */}
                    {currentPage > 3 && (
                        <>
                            <button
                                onClick={() => onFetchInvites(1, perPage)}
                                className="px-3 py-1 bg-teal-800 rounded"
                            >
                                1
                            </button>
                            {currentPage > 4 && (
                                <span className="px-2">...</span>
                            )}
                        </>
                    )}

                    {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1
                        if (
                            page === currentPage ||
                            page === currentPage - 1 ||
                            page === currentPage - 2 ||
                            page === currentPage + 1 ||
                            page === currentPage + 2
                        ) {
                            return (
                                <button
                                    key={page}
                                    onClick={() =>
                                        onFetchInvites(page, perPage)
                                    }
                                    className={`px-3 py-1 rounded ${
                                        currentPage === page
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-teal-800'
                                    }`}
                                >
                                    {page}
                                </button>
                            )
                        }
                        return null
                    })}

                    {currentPage < totalPages - 2 && (
                        <>
                            {currentPage < totalPages - 3 && (
                                <span className="px-2">...</span>
                            )}
                            <button
                                onClick={() =>
                                    onFetchInvites(totalPages, perPage)
                                }
                                className="px-3 py-1 bg-teal-800 rounded"
                            >
                                {totalPages}
                            </button>
                        </>
                    )}

                    {/* Next Button */}
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => onFetchInvites(currentPage + 1, perPage)}
                        className="md:px-4 px-2 md:py-2 py-1 bg-gray-600 text-white rounded disabled:bg-gray-300"
                    >
                        <ArrowRight />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InvitationsTableComponent
