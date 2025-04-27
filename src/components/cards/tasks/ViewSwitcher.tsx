import FormDispatcher from '@/components/ui/FormDispatcher'
import { appStorage } from '@/lib/generic.fn'
import { STORAGE_KEYS } from '@/store/constants'
import { List, Grid, Kanban, PlusSquareIcon } from 'lucide-react'

type Props = {
    viewMode: 'table' | 'card' | 'kanban'
    setViewMode: (mode: 'table' | 'card' | 'kanban') => void
    projectId: string
}

export default function ViewSwitcher({
    viewMode,
    setViewMode,
    projectId,
}: Props) {
    const handlePathIdPersist = () => {
        appStorage.persist(STORAGE_KEYS.ACTIVE_PATH_ID, projectId)
    }
    return (
        <div className="flex space-x-2 text-baseColor">
            <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded ${
                    viewMode === 'table'
                        ? 'bg-gray-200'
                        : 'hover:bg-gray-100 bg-gray-500'
                }`}>
                <List className="w-5 h-5" />
            </button>
            <button
                onClick={() => setViewMode('card')}
                className={`p-2 rounded ${
                    viewMode === 'card'
                        ? 'bg-gray-200'
                        : 'hover:bg-gray-100 bg-gray-500'
                }`}>
                <Grid className="w-5 h-5" />
            </button>
            <button
                onClick={() => {
                    setViewMode('kanban')
                    handlePathIdPersist()
                }}
                className={`p-2 rounded ${
                    viewMode === 'kanban'
                        ? 'bg-gray-200'
                        : 'hover:bg-gray-100 bg-gray-500'
                }`}>
                <Kanban className="w-5 h-5" />
            </button>
            <FormDispatcher
                text={<PlusSquareIcon className="w-5 h-5" />}
                onOutsideClick={handlePathIdPersist}
                type={'create-task'}
                classNames="p-2 rounded hover:bg-emerald-900 bg-emerald-500 text-white"
            />
        </div>
    )
}
