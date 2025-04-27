import { useState, useRef, useEffect } from 'react'
import Avatar from '@/components/ui/Avatar'
import TruncateText from '@/components/ui/TruncateText'
import { TaskType } from '@/types/tasks'
import { MessageCircleMore, MoreVerticalIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useDrag } from 'react-dnd'
import Badge from '@/components/ui/Badge'
import FormDispatcher from '@/components/ui/FormDispatcher'
import { appStorage } from '@/lib/generic.fn'
import { STORAGE_KEYS } from '@/store/constants'

const ItemType = 'CARD'

export const KanbanCard = ({ task }: { task: TaskType }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemType,
        item: { id: task?.id, statusId: task?.status.id },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    const handlePathIdPersist = () => {
        appStorage.persist(
            STORAGE_KEYS.RESOURCE_TO_EDIT,
            JSON.stringify({
                id: task?.id,
                project_id: task?.project.id,
                title: task?.name,
                description: task?.description,
                status_id: task?.status?.id,
                assigned_to: task?.owner?.id,
                due_date: task?.due_date,
                priority_name: task?.priority,
                taskImage: task?.taskImage,
            }),
        )
    }

    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div
            ref={drag as unknown as React.Ref<HTMLDivElement>}
            className={`p-2 bg-gray-800 text-white min-h-[12rem] rounded-md shadow-md border border-gray-700 cursor-grab transform transition-all ${
                isDragging ? 'opacity-50 scale-95' : 'hover:shadow-lg'
            }`}
        >
            {task?.taskImage && (
                <Image
                    src={task?.taskImage}
                    alt="task image"
                    className="rounded min-h-20 max-h-40 w-full bg-gray-500"
                    width={500}
                    height={200}
                    unoptimized
                />
            )}
            <div className="flex items-center justify-between my-2">
                <Badge priority={task?.priority} />

                {/* More Options Dropdown */}
                <div ref={menuRef} className="relative">
                    <MoreVerticalIcon
                        className="w-5 h-5 text-gray-400 cursor-pointer"
                        onClick={() => setMenuOpen(!menuOpen)}
                    />

                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-20 bg-gray-900 border border-gray-700 shadow-lg rounded-md text-sm">
                            <FormDispatcher
                                text={<h3>Edit</h3>}
                                onOutsideClick={handlePathIdPersist}
                                type={'edit-task'}
                                classNames="block px-4 py-2 text-gray-300 hover:bg-gray-700 w-full text-left"
                            />
                            <Link
                                href={`/tasks/${task?.id}`}
                                className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
                            >
                                View
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <Link href={`/tasks/${task?.id}`} className="font-semibold text-lg">
                {task?.name}
            </Link>
            <p className="text-sm text-gray-400 mt-1 min-h-10">
                <TruncateText text={task?.description} limit={120} />
            </p>

            <div className="flex items-center justify-between my-2">
                <div className="flex items-center gap-1">
                    <Avatar
                        userImage={task?.owner.avatar}
                        username={task?.owner.name}
                        size={25}
                    />
                    <div>
                        <p className="text-xs text-gray-200">
                            <TruncateText text={task?.owner.name} limit={20} />
                        </p>
                        <p className="text-[0.5rem] text-gray-400">
                            Due: {task?.dueDate}
                        </p>
                    </div>
                </div>
                <div className="relative flex items-center text-gray-400">
                    <span className="text-xs mt-0.5">
                        <TruncateText
                            text={String(task?.taskDiscussionCount || 0)}
                            limit={2}
                        />
                    </span>
                    <MessageCircleMore className="w-5 h-5 cursor-pointer" />
                </div>
            </div>
        </div>
    )
}
