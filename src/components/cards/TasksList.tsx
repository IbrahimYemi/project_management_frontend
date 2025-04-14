import { useState } from 'react'
import { TaskType, TaskStatus } from '@/types/tasks'
import ViewSwitcher from './tasks/ViewSwitcher'
import TaskCard from './tasks/TaskCard'
import KanbanBoard from './tasks/KanbanBoard'
import TaskProjectTable from './tasks/TaskProjectTable'

type Props = {
    tasks: TaskType[]
    status: TaskStatus[]
}

export default function TasksList({ tasks, status }: Props) {
    const [viewMode, setViewMode] = useState<'table' | 'card' | 'kanban'>(
        'table',
    )

    const handleStatusChange = (taskId: string, newStatusId: number) => {
        console.log(`Updating task ${taskId} to status ID ${newStatusId}`)
    }

    return (
        <div className="py-6  rounded-lg text-white">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Tasks</h3>
                <ViewSwitcher viewMode={viewMode} setViewMode={setViewMode} />
            </div>

            {viewMode === 'table' && <TaskProjectTable tasks={tasks} />}

            {viewMode === 'kanban' && (
                <KanbanBoard
                    tasks={tasks}
                    taskStatus={status}
                    onStatusChange={handleStatusChange}
                />
            )}

            {viewMode === 'card' && (
                <>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tasks.map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tasks.length == 0 && (
                            <div className="sm:col-span-2 lg:col-span-3 mt-5">
                                <h1 className="text-center w-full">
                                    No tasks available!
                                </h1>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}
