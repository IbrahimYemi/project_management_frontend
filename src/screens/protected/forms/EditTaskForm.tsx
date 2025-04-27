'use client'

import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Loader } from 'lucide-react'
import { appStorage } from '@/lib/generic.fn'
import { STORAGE_KEYS } from '@/store/constants'
import { useFetchProject } from '@/hooks/projects/useFetchProject'
import { CreateTaskParams } from '@/types/tasks'
import { useTaskActions } from '@/hooks/tasks/useTaskActions'

type EditTaskFormProps = {
    onCloseForm: () => void
}

export default function EditTaskForm({ onCloseForm }: EditTaskFormProps) {
    const savedTaskDetails = appStorage.retrieve(STORAGE_KEYS.RESOURCE_TO_EDIT)
    const taskDetails = JSON.parse(savedTaskDetails || '')

    const { data, isLoading } = useFetchProject(taskDetails.project_id || '')
    const project = data?.project
    const members = data?.members
    const priorities = data?.priorities

    const [formData, setFormData] = useState<CreateTaskParams>({
        title: '',
        description: '',
        status_id: '',
        assigned_to: '',
        due_date: '',
        priority_id: '',
        project_id: '',
        taskImage: '',
    })
    const {
        editTask,
        isEditTaskLoading: isCreating,
        isEditTaskSuccess: isSuccess,
    } = useTaskActions()

    const handleCloseForm = useCallback(() => {
        appStorage.remove(STORAGE_KEYS.RESOURCE_TO_EDIT)
        onCloseForm()
    }, [onCloseForm])

    useEffect(() => {
        const taskDetails = JSON.parse(
            appStorage.retrieve(STORAGE_KEYS.RESOURCE_TO_EDIT) || '{}',
        ) as CreateTaskParams | null
        if (!taskDetails) {
            toast.error('No note found to edit')
            handleCloseForm()
            return
        }
        const priorityId =
            priorities?.find(pr => pr.name == taskDetails.priority_name)?.id ||
            ''
        setFormData(prev => ({
            ...prev,
            title: taskDetails.title || '',
            description: taskDetails.description,
            status_id: taskDetails.status_id,
            assigned_to: taskDetails.assigned_to,
            due_date: taskDetails.due_date?.split('T')[0] || '',
            project_id: taskDetails.project_id || '',
            priority_id: priorityId,
            taskImage: taskDetails.taskImage || '',
        }))
    }, [handleCloseForm, priorities])

    useEffect(() => {
        if (isSuccess) handleCloseForm()
    }, [isSuccess, handleCloseForm])

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (
            !formData.title ||
            !formData.description ||
            !formData.assigned_to ||
            !formData.status_id ||
            !formData.due_date
        ) {
            toast.error('Please fill all required fields')
            return
        }

        try {
            await editTask({ id: taskDetails?.id, data: formData })
        } catch {
            toast.error('Failed to create task')
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full text-baseColor m-6">
                <Loader className="animate-spin" /> Loading...
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto p-8 bg-baseColor rounded-2xl shadow-2xl animate-fadeIn text-gray-100 transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <span>📋</span> Edit Task
            </h2>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
                <div className="col-span-2">
                    <label className="floating-label">
                        Task Name
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter task title"
                            className="form-input"
                            required
                        />
                    </label>
                </div>

                <div className="col-span-2">
                    <label className="floating-label">
                        Description
                        <textarea
                            name="description"
                            placeholder="Give a description or direction for the task"
                            value={formData.description}
                            onChange={handleChange}
                            rows={6}
                            className="form-input resize-none"
                            required
                        />
                    </label>
                </div>

                <div>
                    <label className="floating-label">
                        Assigned To
                        <select
                            name="assigned_to"
                            value={formData.assigned_to}
                            onChange={handleChange}
                            className="form-input"
                            required
                        >
                            <option value="">Select Member</option>
                            {members?.map(member => (
                                <option
                                    className="flex gap-2"
                                    key={member.id}
                                    value={member.id}
                                >
                                    {member.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div>
                    <label className="floating-label">
                        Due Date
                        <input
                            type="date"
                            name="due_date"
                            value={formData.due_date}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </label>
                </div>

                <div>
                    <label className="floating-label">
                        Priority
                        <select
                            name="priority_id"
                            value={formData.priority_id}
                            onChange={handleChange}
                            className="form-input"
                            required
                        >
                            <option value="">Select priority</option>
                            {priorities?.map(priority => (
                                <option key={priority.id} value={priority.id}>
                                    {priority.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div>
                    <label className="floating-label">
                        Task Status
                        <select
                            name="status_id"
                            value={formData.status_id}
                            onChange={handleChange}
                            className="form-input"
                            required
                        >
                            <option value="">Select Status</option>
                            {project?.task_status?.map(status => (
                                <option key={status.id} value={status.id}>
                                    {status.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="col-span-2">
                    <label className="floating-label">
                        Task Image URL
                        <input
                            name="taskImage"
                            value={formData.taskImage}
                            onChange={handleChange}
                            placeholder="https://example.com/image.png"
                            className="form-input"
                        />
                    </label>
                </div>

                <div className="col-span-2 flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={handleCloseForm}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-sm hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isCreating}
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-700 flex items-center transition"
                    >
                        {isCreating && <Loader className="animate-spin mr-2" />}
                        {isCreating ? 'Updating...' : 'Update Task'}
                    </button>
                </div>
            </form>
        </div>
    )
}
