'use client'

import { useNoteActions } from '@/hooks/notes/useNoteActions'
import { Note } from '@/types/notes'
import FormDispatcher from '../ui/FormDispatcher'
import { Edit2Icon, Trash, Eye } from 'lucide-react'
import { appStorage } from '@/lib/generic.fn'
import { STORAGE_KEYS } from '@/store/constants'
import DeleteButton from '../ui/DeleteButton'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { setAppState } from '@/store/slices/appStateSlice'
import { useAppDispatch } from '@/store/hooks'
import Avatar from '../ui/Avatar'
import TruncateText from '../ui/TruncateText'

function NoteCard({ note }: { note: Note }) {
    const { deleteNote } = useNoteActions()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const openModal = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('note', note.id)

        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="group p-2 md:p-4 text-white rounded-lg bg-gray-800 shadow-lg border hover:border-emerald-400 transition-all w-full">
            <div className="h-36 overflow-hidden">
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                    {note.title}
                </h3>
                <p className="text-gray-500">
                    <TruncateText text={note.content} limit={200} />
                </p>
            </div>

            {/* Owner and Project */}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center gap-2">
                    <Avatar
                        userImage={note.owner.avatar}
                        size={20}
                        username={note.owner.name}
                    />
                    <span>{note.owner.name}</span>
                </div>
                {note.project && (
                    <span className="italic text-emerald-400 truncate md:max-w-[50%]">
                        {note.project.name ?? 'Personal Note'}
                    </span>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                    <FormDispatcher
                        text={<Edit2Icon className="w-4 h-4" />}
                        onOutsideClick={() => {
                            appStorage.persist(
                                STORAGE_KEYS.ACTIVE_PATH_ID,
                                note.id,
                            )
                            appStorage.persist(
                                STORAGE_KEYS.RESOURCE_TO_EDIT,
                                JSON.stringify(note),
                            )
                        }}
                        type="edit-note"
                        classNames="bg-emerald-600 text-white rounded"
                    />
                    <DeleteButton
                        text={<Trash className="w-4 h-4" />}
                        classNames="bg-red-500 text-white rounded px-3 py-2"
                        onClick={() => {
                            dispatch(setAppState('isRequesting'))
                            deleteNote(note.id)
                        }}
                    />
                </div>
                <button
                    onClick={openModal}
                    className="bg-emerald-600 text-white px-3 py-1 text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <Eye className="inline w-4 h-4 mr-1" />
                    View
                </button>
            </div>
        </div>
    )
}

export default NoteCard
