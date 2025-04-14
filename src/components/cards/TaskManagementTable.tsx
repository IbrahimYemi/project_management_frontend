import SearchInput from './SearchInput'
import { STORAGE_KEYS } from '@/store/constants'
import PaginationControl from './PaginationControl'
import { TaskType } from '@/types/tasks'
import TaskTable from '../tables/TaskTable'

type TasksManagementTableComponentProps = {
    tasks: TaskType[]
    currentPage: number
    totalPages: number
    perPage: number
    onSearchQuery: (searchQuery: string) => Promise<void>
    onFetchTasks: (page: number, perPage: number) => void
}

const TaskManagementTable: React.FC<TasksManagementTableComponentProps> = ({
    tasks,
    currentPage,
    totalPages,
    perPage,
    onFetchTasks,
    onSearchQuery,
}) => {
    return (
        <div className="p-2 md:p-6 bg-baseColor w-full text-white rounded-md shadow-md">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Tasks Management</h2>
            </div>
            <div className="flex items-center bg-gray-700 md:w-2/5 mb-2 text-baseText border rounded">
                <SearchInput
                    onSearch={onSearchQuery}
                    storageKey={STORAGE_KEYS.CALENDAR_SEARCH_INPUT}
                />
            </div>
            <div className="w-full overflow-x-auto">
                <TaskTable tasks={tasks} />
            </div>
            {/* Pagination Component */}
            {tasks.length > 0 && (
                <PaginationControl
                    currentPage={currentPage}
                    totalPages={totalPages}
                    perPage={perPage}
                    onPageChange={onFetchTasks}
                />
            )}
        </div>
    )
}

export default TaskManagementTable
