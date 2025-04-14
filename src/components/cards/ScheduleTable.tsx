import SearchInput from './SearchInput'
import { STORAGE_KEYS } from '@/store/constants'
import PaginationControl from './PaginationControl'
import { Schedule } from '@/types/schedule'
import MeetingsTable from '../tables/MeetingsTable'
import { useAppDispatch } from '@/store/hooks'
import { useScheduleActions } from '@/hooks/schedules/useScheduleActions'
import { setAppState } from '@/store/slices/appStateSlice'

type ScheduleTableComponentProps = {
    schedules: Schedule[]
    currentPage: number
    totalPages: number
    perPage: number
    onSearchQuery: (searchQuery: string) => Promise<void>
    onFetchSchedules: (page: number, perPage: number) => void
}

const ScheduleTableComponent: React.FC<ScheduleTableComponentProps> = ({
    schedules,
    currentPage,
    totalPages,
    perPage,
    onFetchSchedules,
    onSearchQuery,
}) => {
    const dispatch = useAppDispatch()
    const { deleteSchedule } = useScheduleActions()

    const handleDelete = (id: string) => {
        dispatch(setAppState('isRequesting'))
        deleteSchedule(id)
    }

    return (
        <div className="p-2 md:p-6 bg-baseColor w-full text-white rounded-md shadow-md">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Schedules Management</h2>
            </div>
            <div className="flex items-center bg-gray-700 md:w-2/5 mb-2 text-baseText border rounded">
                <SearchInput
                    onSearch={onSearchQuery}
                    storageKey={STORAGE_KEYS.CALENDAR_SEARCH_INPUT}
                />
            </div>
            <div className="w-full overflow-x-auto">
                <MeetingsTable
                    schedules={schedules}
                    onDelete={id => handleDelete(id)}
                />
            </div>
            {/* Pagination Component */}
            {schedules.length > 0 && (
                <PaginationControl
                    currentPage={currentPage}
                    totalPages={totalPages}
                    perPage={perPage}
                    onPageChange={onFetchSchedules}
                />
            )}
        </div>
    )
}

export default ScheduleTableComponent
