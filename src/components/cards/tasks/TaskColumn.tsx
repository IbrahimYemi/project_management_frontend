import { TaskStatus, TaskType } from '@/types/tasks'
import { useDrop } from 'react-dnd'
import { KanbanCard } from './TaskKanbanCard'
import FormDispatcher from '@/components/ui/FormDispatcher'
import { PlusIcon } from 'lucide-react'

const ItemType = 'CARD'

export const KanbanColumn = ({
    status,
    tasks,
    moveTask,
}: {
    status: TaskStatus
    tasks: TaskType[]
    moveTask: (id: string, statusId: number) => void
}) => {
    const [, drop] = useDrop({
        accept: ItemType,
        drop: (item: { id: string }) => {
            moveTask(item.id, status.id)
        },
    })

    return (
        <div
            ref={drop as unknown as React.Ref<HTMLDivElement>}
            className="w-[320px] flex-shrink-0 p-2"
        >
            <div className="flex items-center justify-between text-lg font-bold mb-3 p-3 rounded-md text-white bg-gray-700 shadow-md">
                <h2 className="text-center">{status.name}</h2>

                <FormDispatcher
                    text={<PlusIcon className="w-5 h-5" />}
                    type="create-task"
                    classNames="bg-emerald-600 text-white"
                />
            </div>
            <div className="space-y-4 bg-gray-900 p-3 rounded-lg shadow-inner min-h-[400px] overflow-y-auto">
                {tasks.map(task => (
                    <KanbanCard key={task.id} task={task} />
                ))}
            </div>
        </div>
    )
}
