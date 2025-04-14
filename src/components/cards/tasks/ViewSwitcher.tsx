import { List, Grid, Kanban } from 'lucide-react'

type Props = {
    viewMode: 'table' | 'card' | 'kanban'
    setViewMode: (mode: 'table' | 'card' | 'kanban') => void
}

export default function ViewSwitcher({ viewMode, setViewMode }: Props) {
    return (
        <div className="flex space-x-2 text-baseColor">
            <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded ${
                    viewMode === 'table'
                        ? 'bg-gray-200'
                        : 'hover:bg-gray-100 bg-gray-500'
                }`}
            >
                <List className="w-5 h-5" />
            </button>
            <button
                onClick={() => setViewMode('card')}
                className={`p-2 rounded ${
                    viewMode === 'card'
                        ? 'bg-gray-200'
                        : 'hover:bg-gray-100 bg-gray-500'
                }`}
            >
                <Grid className="w-5 h-5" />
            </button>
            <button
                onClick={() => setViewMode('kanban')}
                className={`p-2 rounded ${
                    viewMode === 'kanban'
                        ? 'bg-gray-200'
                        : 'hover:bg-gray-100 bg-gray-500'
                }`}
            >
                <Kanban className="w-5 h-5" />
            </button>
        </div>
    )
}
