'use client'

import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Loader } from 'lucide-react'
import { useNoteActions } from '@/hooks/notes/useNoteActions'
import { Note } from '@/types/notes'
import { appStorage } from '@/lib/generic.fn'
import { STORAGE_KEYS } from '@/store/constants'

type EditNoteFormProps = {
    onCloseForm: () => void
}

export default function EditNoteForm({ onCloseForm }: EditNoteFormProps) {
    const [formData, setFormData] = useState({ title: '', content: '' })

    const handleCloseForm = useCallback(() => {
        appStorage.remove(STORAGE_KEYS.RESOURCE_TO_EDIT)
        onCloseForm()
    }, [onCloseForm])

    useEffect(() => {
        const storedNote = JSON.parse(
            appStorage.retrieve(STORAGE_KEYS.RESOURCE_TO_EDIT) || '{}',
        ) as Note | null
        if (!storedNote) {
            toast.error('No note found to edit')
            handleCloseForm()
            return
        }

        setFormData({
            title: storedNote.title || '',
            content: storedNote.content || '',
        })
    }, [handleCloseForm])

    const { editNote, isEditNoteLoading, isEditNoteSuccess } = useNoteActions()

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    useEffect(() => {
        if (isEditNoteSuccess) {
            handleCloseForm()
            appStorage.remove(STORAGE_KEYS.RESOURCE_TO_EDIT)
        }
    }, [isEditNoteSuccess, handleCloseForm])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.title || !formData.content) {
            toast.error('Both title and content are required')
            return
        }

        try {
            const storedNote = JSON.parse(
                appStorage.retrieve(STORAGE_KEYS.RESOURCE_TO_EDIT) || '{}',
            ) as Note
            await editNote({ id: storedNote.id, data: formData })
        } catch {
            toast.error('Failed to update note')
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-baseColor rounded-xl shadow-lg animate-fadeIn text-gray-200">
            <h2 className="text-xl font-bold mb-4">✏️ Edit Note</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1 text-gray-400">
                        Title
                    </label>
                    <input
                        type="text"
                        placeholder="Enter note title"
                        name="title"
                        className="w-full border border-gray-300 text-gray-100 bg-gray-700 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1 text-gray-400">
                        Content
                    </label>
                    <textarea
                        name="content"
                        placeholder="Enter note content"
                        rows={5}
                        className="w-full border border-gray-300 text-gray-100 bg-gray-700 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={handleCloseForm}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center"
                        disabled={isEditNoteLoading}
                    >
                        {isEditNoteLoading && (
                            <Loader className="animate-spin mr-2" />
                        )}
                        {isEditNoteLoading ? 'Updating...' : 'Update Note'}
                    </button>
                </div>
            </form>
        </div>
    )
}
