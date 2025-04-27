import { TaskStatus, TaskType } from '@/types/tasks'
import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { KanbanColumn } from './TaskColumn'

type Props = {
    tasks: TaskType[]
    taskStatus: TaskStatus[]
    onStatusChange: (taskId: string, newStatusId: number) => void
}

const KanbanBoard = ({ tasks, taskStatus, onStatusChange }: Props) => {
    const [taskList, setTaskList] = useState(tasks)

    const moveTask = (id: string, newStatusId: number) => {
        setTaskList(prev =>
            prev.map(task =>
                task.id === id
                    ? {
                          ...task,
                          status: {
                              id: newStatusId,
                              name:
                                  taskStatus.find(s => s.id === newStatusId)
                                      ?.name || '',
                              percentage:
                                  taskStatus.find(s => s.id === newStatusId)
                                      ?.percentage || 0,
                          },
                      }
                    : task,
            ),
        )

        // Notify parent about the status change
        onStatusChange(id, newStatusId)
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="bg-gray-900 min-h-[65vh] text-white overflow-x-auto">
                <div className="flex gap-6 w-max">
                    {taskStatus.map(status => (
                        <KanbanColumn
                            key={status.id}
                            status={status}
                            tasks={taskList.filter(
                                t => t.status.id === status.id,
                            )}
                            moveTask={moveTask}
                        />
                    ))}
                </div>
            </div>
        </DndProvider>
    )
}

export default KanbanBoard
