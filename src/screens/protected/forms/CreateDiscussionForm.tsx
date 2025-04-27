'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Loader } from 'lucide-react'
import { appStorage } from '@/lib/generic.fn'
import { STORAGE_KEYS } from '@/store/constants'
import { DiscussionParams } from '@/types/tasks'
import { useParams } from 'next/navigation'
import { useTaskActions } from '@/hooks/tasks/useTaskActions'

type CreateDiscussionFormProps = {
    onCloseForm: () => void
}

export default function CreateDiscussionForm({
    onCloseForm,
}: CreateDiscussionFormProps) {
    const { id } = useParams()
    const [formData, setFormData] = useState<DiscussionParams>({
        content: '',
        task_id: String(id) || '',
    })
    const {
        createDiscussion,
        isCreateDiscussionLoading,
        isCreateDiscussionSuccess,
    } = useTaskActions()

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
        if (isCreateDiscussionSuccess) onCloseForm()
    }, [isCreateDiscussionSuccess, onCloseForm])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.content) {
            toast.error('content field is required')
            return
        }

        try {
            await createDiscussion({ params: formData })
        } catch {
            toast.error('Failed to Create Discussion')
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-baseColor rounded-xl shadow-lg animate-fadeIn text-gray-100">
            <h2 className="text-xl font-bold mb-4">📝 Add your thoughts!</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1 text-gray-400">
                        Content
                    </label>
                    <textarea
                        name="content"
                        placeholder="Enter content"
                        rows={8}
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
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center"
                        disabled={isCreateDiscussionLoading}>
                        {isCreateDiscussionLoading && (
                            <Loader className="animate-spin mr-2" />
                        )}
                        {isCreateDiscussionLoading
                            ? 'Saving...'
                            : 'Save Message'}
                    </button>
                </div>
            </form>
        </div>
    )
}
