import TaskTable from '@/components/tables/TaskTable'
import { TaskType } from '@/types/tasks'

type Props = {
    tasks: TaskType[]
}

export default function TaskProjectTable({ tasks }: Props) {
    return (
        <div className="w-full overflow-x-auto">
            <TaskTable tasks={tasks} />
        </div>
    )
}
