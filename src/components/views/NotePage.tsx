'use client'

import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Note } from '@/types/notes'
import { appStorage } from '@/lib/generic.fn'
import { STORAGE_KEYS } from '@/store/constants'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import NoteCard from './NoteCard'
import NoteModal from './NoteModal'
import { Sparkles } from 'lucide-react'

type NotePageProps = {
    notes: Note[]
}

export default function NotePage({ notes }: NotePageProps) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const selectedId = searchParams.get('note')
    const selectedNote = notes.find(n => n.id === selectedId)

    useEffect(() => {
        if (selectedId) {
            appStorage.persist(STORAGE_KEYS.ACTIVE_PATH_ID, selectedId)
        }
    }, [selectedId])

    const handleCloseModal = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('note')
        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="w-full">
            {notes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-14 text-center">
                    <Sparkles className="w-12 h-12 text-emerald-500 mb-4 animate-bounce" />
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                        No Notes Yet
                    </h3>
                    <p className="text-gray-500">
                        Start creating notes to see them here!
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {notes.map(note => (
                        <NoteCard key={note.id} note={note} />
                    ))}

                    <AnimatePresence>
                        {selectedNote && (
                            <NoteModal
                                note={selectedNote}
                                onClose={handleCloseModal}
                            />
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    )
}
