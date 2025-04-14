import Avatar from '@/components/ui/Avatar'
import { TaskType, TaskStatus } from '@/types/tasks'
import { ChevronDown } from 'lucide-react'

type Props = {
    task: TaskType
    status: TaskStatus[]
    onStatusChange: (taskId: string, newStatusId: number) => void
}

export default function TaskRow({ task, status, onStatusChange }: Props) {
    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50">
            <td className="py-3 px-4 font-medium">{task.name}</td>
            <td className="py-3 px-4">{task.description}</td>
            <td className="py-3 px-4 text-center">
                <div className="relative">
                    <select
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 border appearance-none focus:outline-none"
                        value={task.status.id}
                        onChange={e =>
                            onStatusChange(task.id!, Number(e.target.value))
                        }
                    >
                        {status.map(s => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
            </td>
            <td className="py-3 px-4 text-center">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        task.priority === 'high'
                            ? 'bg-red-500 text-white'
                            : task.priority === 'medium'
                              ? 'bg-orange-500 text-white'
                              : 'bg-blue-500 text-white'
                    }`}
                >
                    {task.priority}
                </span>
            </td>
            <td className="py-3 px-4 flex items-center space-x-3">
                <Avatar
                    userImage={task.owner.avatar}
                    username={task.owner.name}
                />
                <div>
                    <p className="font-medium">{task.owner.name}</p>
                    <p className="text-xs text-gray-500">{task.owner.email}</p>
                </div>
            </td>
        </tr>
    )
}
