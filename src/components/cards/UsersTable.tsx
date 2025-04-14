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
    LockKeyhole,
    LockKeyholeOpenIcon,
    Trash,
    User2,
    UserPen,
    UserPlus,
} from 'lucide-react'
import { User } from '@/types/authTypes'
import Avatar from '../ui/Avatar'
import SearchInput from './SearchInput'
import Link from 'next/link'
import EmptyTable from './EmptyTable'
import { STORAGE_KEYS } from '@/store/constants'
import PaginationControl from './PaginationControl'
import { UserActionsType } from '@/types/users'

type UserManagementTableProps = {
    users: User[]
    currentPage: number
    totalPages: number
    perPage: number
    onFetchUsers: (page: number, perPage: number) => void
    handleUserActions: (type: UserActionsType, id: string) => void
    onSearchQuery: (searchQuery: string) => Promise<void>
}

const UserManagementTable: React.FC<UserManagementTableProps> = ({
    users,
    currentPage,
    totalPages,
    perPage,
    onFetchUsers,
    handleUserActions,
    onSearchQuery,
}) => {
    const [globalFilter, setGlobalFilter] = useState<string | undefined>(
        undefined,
    )

    const columns = useMemo<ColumnDef<User>[]>(
        () => [
            {
                accessorKey: 'avatar',
                header: 'Avatar',
                cell: ({ row }) => (
                    <Avatar
                        size={30}
                        userImage={row.original.avatar}
                        username={row.original.name}
                    />
                ),
            },
            { accessorKey: 'name', header: 'Name' },
            { accessorKey: 'email', header: 'Email' },
            { accessorKey: 'app_role', header: 'Role' },
            {
                accessorKey: 'isActive',
                header: 'Status',
                cell: ({ row }) => (
                    <span
                        className={`px-2 py-1 text-xs rounded-md ${
                            row.original.isActive
                                ? 'bg-green-500 text-white'
                                : 'bg-red-500 text-white'
                        }`}
                    >
                        {row.original.isActive ? 'Active' : 'Restricted'}
                    </span>
                ),
            },
            {
                id: 'actions',
                header: 'Actions',
                cell: ({ row }) => {
                    const user = row.original
                    const currentRole = user.app_role?.toLowerCase()

                    return (
                        <div className="flex gap-2">
                            {currentRole !== 'super admin' &&
                                currentRole !== 'admin' && (
                                    <button
                                        className="px-2 py-1 text-xs bg-blue-600 text-white rounded"
                                        onClick={() =>
                                            handleUserActions(
                                                'make-admin',
                                                user.id,
                                            )
                                        }
                                        title="Make Admin"
                                    >
                                        <UserPlus />
                                    </button>
                                )}
                            {currentRole !== 'super admin' &&
                                currentRole !== 'teamlead' && (
                                    <button
                                        className="px-2 py-1 text-xs bg-indigo-600 text-white rounded"
                                        onClick={() =>
                                            handleUserActions(
                                                'make-teamlead',
                                                user.id,
                                            )
                                        }
                                        title="Make Team Lead"
                                    >
                                        <UserPen />
                                    </button>
                                )}
                            {currentRole !== 'super admin' &&
                                currentRole !== 'member' && (
                                    <button
                                        className="px-2 py-1 text-xs bg-gray-700 text-white rounded"
                                        onClick={() =>
                                            handleUserActions(
                                                'make-member',
                                                user.id,
                                            )
                                        }
                                        title="Make Member"
                                    >
                                        <User2 />
                                    </button>
                                )}
                            <button
                                className={`px-3 py-1 text-sm bg-yellow-500 text-white rounded disabled:opacity-50`}
                                onClick={() =>
                                    handleUserActions('restrict', user.id)
                                }
                                disabled={!user.isActive}
                            >
                                <LockKeyhole />
                            </button>
                            <button
                                className={`px-3 py-1 text-sm bg-green-500 text-white rounded disabled:opacity-50`}
                                onClick={() =>
                                    handleUserActions('activate', user.id)
                                }
                                disabled={user.isActive}
                            >
                                <LockKeyholeOpenIcon />
                            </button>
                            <button
                                className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                                onClick={() =>
                                    handleUserActions('delete', user.id)
                                }
                            >
                                <Trash />
                            </button>
                        </div>
                    )
                },
            },
        ],
        [],
    )

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
    })

    return (
        <div className="p-2 md:p-6 bg-baseColor w-full text-white rounded-md shadow-md">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">User Management</h2>
                <Link
                    href="/users/invites"
                    className="bg-emerald-600 text-white rounded-md text-center py-0.5 px-2"
                >
                    Invites
                </Link>
            </div>
            <div className="flex items-center bg-gray-700 md:w-2/5 mb-2 text-baseText border rounded">
                <SearchInput
                    storageKey={STORAGE_KEYS.USERS_SEARCH_INPUT}
                    onSearch={onSearchQuery}
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
                        {users.length < 1 && (
                            <tr>
                                <td colSpan={4}>
                                    <EmptyTable<User>
                                        data={users}
                                        text="No users available, start inviting"
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
                onPageChange={onFetchUsers}
            />
        </div>
    )
}

export default UserManagementTable
