import SearchInput from './SearchInput'
import { STORAGE_KEYS } from '@/store/constants'
import { Projects } from '@/types/projects'
import PaginationControl from './PaginationControl'
import ProjectsTable from '../tables/ProjectsTable'
import FormDispatcher from '../ui/FormDispatcher'
import { PlusSquareIcon } from 'lucide-react'

type ProjectManagementTableProps = {
    projects: Projects[]
    currentPage: number
    totalPages: number
    perPage: number
    onFetchProjects: (page: number, perPage: number) => void
    onDelete: (id: string) => void
    onMarkCompleted: (id: string) => void
    onSearchQuery: (searchQuery: string) => Promise<void>
}

const ProjectManagementTable: React.FC<ProjectManagementTableProps> = ({
    projects,
    currentPage,
    totalPages,
    perPage,
    onFetchProjects,
    onDelete,
    onMarkCompleted,
    onSearchQuery,
}) => {
    return (
        <div className="p-2 md:p-6 bg-baseColor w-full text-white rounded-md shadow-md">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Project Management</h2>
                <FormDispatcher
                    text={
                        <>
                            <PlusSquareIcon className="size-3" />
                            <h3>create</h3>
                        </>
                    }
                    type={'create-project'}
                    classNames="bg-emerald-700 flex items-center gap-1 text-sm md:text-base text-white rounded-md text-center py-0.5 px-2"
                />
            </div>
            <div className="flex items-center bg-gray-700 md:w-2/5 mb-2 text-baseText border rounded">
                <SearchInput
                    storageKey={STORAGE_KEYS.PROJECTS_SEARCH_INPUT}
                    onSearch={onSearchQuery}
                />
            </div>
            <div className="w-full overflow-x-auto">
                <ProjectsTable
                    projects={projects}
                    onDelete={onDelete}
                    onMarkCompleted={onMarkCompleted}
                />
            </div>
            {/* Pagination Component */}
            <PaginationControl
                currentPage={currentPage}
                totalPages={totalPages}
                perPage={perPage}
                onPageChange={onFetchProjects}
            />
        </div>
    )
}

export default ProjectManagementTable
