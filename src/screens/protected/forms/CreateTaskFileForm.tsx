'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Loader } from 'lucide-react'
import { appStorage } from '@/lib/generic.fn'
import { STORAGE_KEYS } from '@/store/constants'
import { CreateTaskFileParams } from '@/types/tasks'
import { useParams } from 'next/navigation'
import { useTaskActions } from '@/hooks/tasks/useTaskActions'

type CreateTaskFileFormProps = {
    onCloseForm: () => void
}

export default function CreateTaskFileForm({
    onCloseForm,
}: CreateTaskFileFormProps) {
    const { id } = useParams()
    const [formData, setFormData] = useState<CreateTaskFileParams>({
        url: '',
        name: '',
        type: 'image',
        task_id: String(id) || '',
    })
    const { createTaskFile, isCreateTaskFileLoading, isCreateTaskFileSuccess } =
        useTaskActions()

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
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
        if (isCreateTaskFileSuccess) onCloseForm()
    }, [isCreateTaskFileSuccess, onCloseForm])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.url) {
            toast.error('Both name and url are required')
            return
        }

        try {
            await createTaskFile({ params: formData })
        } catch {
            toast.error('Failed to Add New File')
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-baseColor rounded-xl shadow-lg animate-fadeIn text-gray-100">
            <h2 className="text-xl font-bold mb-4">📝 Add New File</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1 text-gray-400">
                        File Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter file name"
                        className="w-full border bg-gray-700 border-gray-300 px-4 text-gray-100 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1 text-gray-400">
                        File URL
                    </label>
                    <textarea
                        name="url"
                        placeholder="Enter file url"
                        rows={2}
                        className="w-full border bg-gray-700 border-gray-300 px-4 text-gray-100 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        value={formData.url}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1 text-gray-400">
                        File Type
                    </label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg text-gray-100 bg-gray-700"
                        required>
                        <option value="">Select a status</option>
                        {['image', 'docs'].map(type => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={onCloseForm}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center"
                        disabled={isCreateTaskFileLoading}>
                        {isCreateTaskFileLoading && (
                            <Loader className="animate-spin mr-2" />
                        )}
                        {isCreateTaskFileLoading ? 'Saving...' : 'Save File'}
                    </button>
                </div>
            </form>
        </div>
    )
}
