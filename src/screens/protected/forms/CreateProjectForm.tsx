'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Loader, PlusCircle, Trash } from 'lucide-react'
import { useTeams as useAllTeams } from '@/hooks/teams/useTeams'
import { CreateProjectParams } from '@/types/projects'
import { useAllProjectStatuses } from '@/hooks/projects/useProjectStatuses'
import { useProjectActions } from '@/hooks/projects/useProjectActions'

type CreateProjectFormProps = {
    onCloseForm: () => void
}

export default function CreateProjectForm({
    onCloseForm,
}: CreateProjectFormProps) {
    const {
        createProject,
        isCreateProjectLoading: isLoading,
        isCreateProjectSuccess: isSuccess,
    } = useProjectActions()
    const { data: teams = [], isLoading: isFetchingTeams } = useAllTeams()
    const { data: statuses = [], isLoading: isFetchingStatuses } =
        useAllProjectStatuses()

    const [formData, setFormData] = useState<CreateProjectParams>({
        name: '',
        description: '',
        team_id: '',
        status_id: '',
        task_statuses: [
            {
                name: 'Backlog',
                percentage: '10',
            },
            {
                name: 'In Progress',
                percentage: '20',
            },
            {
                name: 'Completed',
                percentage: '70',
            },
            {
                name: 'Testing',
                percentage: '80',
            },
            {
                name: 'In Review',
                percentage: '90',
            },
            {
                name: 'Approved',
                percentage: '100',
            },
            {
                name: 'On Hold',
                percentage: '30',
            },
        ],
    })

    useEffect(() => {
        if (isSuccess) onCloseForm()
    }, [isSuccess, onCloseForm])

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleTaskStatusChange = (
        index: number,
        field: string,
        value: string,
    ) => {
        const updatedTasks = [...(formData.task_statuses || [])]
        updatedTasks[index][field as keyof (typeof updatedTasks)[number]] =
            value
        setFormData(prev => ({ ...prev, task_statuses: updatedTasks }))
    }

    const addTaskStatus = () => {
        setFormData(prev => ({
            ...prev,
            task_statuses: [
                ...(prev.task_statuses || []),
                { name: '', percentage: '' },
            ],
        }))
    }

    const removeTaskStatus = (index: number) => {
        const updatedTasks = [...(formData.task_statuses || [])]
        updatedTasks.splice(index, 1)
        setFormData(prev => ({ ...prev, task_statuses: updatedTasks }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (
            !formData.name ||
            !formData.team_id ||
            !formData.status_id ||
            formData.task_statuses?.length === 0
        ) {
            toast.error('Please fill in all required fields')
            return
        }

        try {
            await createProject(formData)
        } catch {
            toast.error('Failed to create project')
        }
    }

    if (isFetchingTeams || isFetchingStatuses) {
        return (
            <div className="flex items-center justify-center h-full text-baseColor m-6">
                <Loader className="animate-spin" /> Loading...
            </div>
        )
    }

    return (
        <div className="p-6 bg-baseColor text-gray-100 rounded-lg shadow-lg animate-fadeIn w-full">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">
                Create Project
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Project Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-400">
                        Project Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg text-gray-100 bg-gray-700"
                        placeholder="Enter project name"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-400">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg text-gray-100 bg-gray-700"
                        placeholder="Enter project description"
                    />
                </div>

                {/* Team Select */}
                <div>
                    <label className="block text-sm font-medium text-gray-400">
                        Team
                    </label>
                    <select
                        name="team_id"
                        value={formData.team_id}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg text-gray-100 bg-gray-700"
                        required
                    >
                        <option value="">Select a team</option>
                        {teams.map(team => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status Select */}
                <div>
                    <label className="block text-sm font-medium text-gray-400">
                        Status
                    </label>
                    <select
                        name="status_id"
                        value={formData.status_id}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg text-gray-100 bg-gray-700"
                        required
                    >
                        <option value="">Select a status</option>
                        {statuses.map(
                            (status: { id: string; name: string }) => (
                                <option key={status.id} value={status.id}>
                                    {status.name}
                                </option>
                            ),
                        )}
                    </select>
                </div>

                {/* Task Statuses */}
                <div>
                    <label className="block text-sm font-medium text-gray-400">
                        Task Statuses
                    </label>
                    <div className="space-y-3 mt-2">
                        {formData.task_statuses?.map((task, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-2 flex-wrap md:flex-nowrap"
                            >
                                <input
                                    type="text"
                                    placeholder="Status Name"
                                    value={task.name}
                                    onChange={e =>
                                        handleTaskStatusChange(
                                            idx,
                                            'name',
                                            e.target.value,
                                        )
                                    }
                                    className="flex-1 px-3 py-2 border rounded-lg text-gray-100 bg-gray-700"
                                />
                                <input
                                    type="number"
                                    placeholder="%"
                                    value={task.percentage}
                                    onChange={e =>
                                        handleTaskStatusChange(
                                            idx,
                                            'percentage',
                                            e.target.value,
                                        )
                                    }
                                    className="w-24 px-3 py-2 border rounded-lg text-gray-100 bg-gray-700"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeTaskStatus(idx)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <Trash size={18} />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addTaskStatus}
                            className="flex items-center text-blue-600 hover:underline gap-2"
                        >
                            <PlusCircle size={18} /> Add Task Status
                        </button>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        onClick={onCloseForm}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg flex items-center"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader className="animate-spin mr-2" />
                        ) : null}
                        {isLoading ? 'Creating...' : 'Create Project'}
                    </button>
                </div>
            </form>
        </div>
    )
}
