import TruncateText from '@/components/ui/TruncateText'
import { TaskType } from '@/types/tasks'
import Link from 'next/link'

type Props = {
    task: TaskType
}

export default function TaskCard({ task }: Props) {
    return (
        <div
            key={task.id}
            className="p-4 bg-baseColor shadow-lg rounded-lg border border-brand text-white relative"
        >
            <h4 className="text-lg font-bold text-brand">{task.name}</h4>
            <p className="text-sm text-gray-300 mb-2">
                <TruncateText text={task.description} limit={150} />
            </p>
            <p className="text-xs text-gray-400">Due: {task.dueDate}</p>
            <div className="flex items-center justify-between mt-2">
                <div className="w-fit px-3 py-1 rounded border border-brand bg-transparent text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand">
                    {task.status.name}
                </div>
                <Link
                    href={`/tasks/${task.id}`}
                    className={` px-3 py-1 rounded border text-sm bg-emerald-500 text-white`}
                >
                    view
                </Link>
            </div>
        </div>
    )
}
