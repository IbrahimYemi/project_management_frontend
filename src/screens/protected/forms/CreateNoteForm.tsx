'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Loader } from 'lucide-react'
import { useNoteActions } from '@/hooks/notes/useNoteActions'
import { appStorage } from '@/lib/generic.fn'
import { STORAGE_KEYS } from '@/store/constants'

type CreateNoteFormProps = {
    onCloseForm: () => void
}

export default function CreateNoteForm({ onCloseForm }: CreateNoteFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        project_id: '',
    })
    const { createNote, isCreateNoteLoading, isCreateNoteSuccess } =
        useNoteActions()

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    useEffect(() => {
        const projectId = appStorage.retrieve(STORAGE_KEYS.ACTIVE_PATH_ID)
        if (projectId) {
            setFormData(prev => ({ ...prev, project_id: projectId }))
        }
    }, [])

    useEffect(() => {
        if (isCreateNoteSuccess) onCloseForm()
    }, [isCreateNoteSuccess, onCloseForm])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.title || !formData.content) {
            toast.error('Both title and content are required')
            return
        }

        try {
            await createNote(formData)
        } catch {
            toast.error('Failed to create note')
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-baseColor rounded-xl shadow-lg animate-fadeIn text-gray-100">
            <h2 className="text-xl font-bold mb-4">📝 Create Note</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1 text-gray-400">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter note title"
                        className="w-full border bg-gray-700 border-gray-300 px-4 text-gray-100 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500"
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
                        className="w-full border bg-gray-700 border-gray-300 px-4 text-gray-100 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={onCloseForm}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center"
                        disabled={isCreateNoteLoading}
                    >
                        {isCreateNoteLoading && (
                            <Loader className="animate-spin mr-2" />
                        )}
                        {isCreateNoteLoading ? 'Saving...' : 'Save Note'}
                    </button>
                </div>
            </form>
        </div>
    )
}
