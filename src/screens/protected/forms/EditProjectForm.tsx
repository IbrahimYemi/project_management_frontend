/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Loader } from 'lucide-react'
import { useTeams as useAllTeams } from '@/hooks/teams/useTeams'
import { CreateProjectParams } from '@/types/projects'
import { useAllProjectStatuses } from '@/hooks/projects/useProjectStatuses'
import { useProjectActions } from '@/hooks/projects/useProjectActions'
import { appStorage } from '@/lib/generic.fn'
import { STORAGE_KEYS } from '@/store/constants'
import { useFetchProject } from '@/hooks/projects/useFetchProject'

type CreateProjectFormProps = {
    onCloseForm: () => void
}

export default function EditProjectForm({
    onCloseForm,
}: CreateProjectFormProps) {
    const [teamIdUsed, setTeamIdUsed] = useState<string | null>(null)
    const { data } = useFetchProject(teamIdUsed || '')
    const cachedProjectDetails = data?.project

    const [formData, setFormData] = useState<CreateProjectParams>({
        name: '',
        description: '',
        team_id: '',
        status_id: '',
        task_statuses: cachedProjectDetails?.task_status || [
            { name: '', percentage: '' },
        ],
    })

    useEffect(() => {
        const teamId = appStorage.retrieve(STORAGE_KEYS.ACTIVE_PATH_ID)
        if (teamId) {
            setTeamIdUsed(teamId)
        } else {
            onCloseForm()
        }
    }, [])

    useEffect(() => {
        if (cachedProjectDetails?.task_status?.length) {
            setFormData({
                name: cachedProjectDetails?.name || '',
                description: cachedProjectDetails?.description || '',
                team_id: cachedProjectDetails?.team_id || '',
                status_id: cachedProjectDetails?.status_id || '',
            })
        }
    }, [cachedProjectDetails?.task_status])

    const {
        editProject,
        isEditProjectLoading: isLoading,
        isEditProjectSuccess: isSuccess,
    } = useProjectActions()

    const { data: teams = [], isLoading: isFetchingTeams } = useAllTeams()
    const { data: statuses = [], isLoading: isFetchingStatuses } =
        useAllProjectStatuses()

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name || !formData.team_id || !formData.status_id) {
            toast.error('Please fill in all required fields')
            return
        }

        try {
            console.log(formData)
            await editProject({
                id: cachedProjectDetails?.id as string,
                data: formData,
            })
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
        <div className="max-w-4xl mx-auto p-8 bg-baseColor rounded-2xl shadow-2xl animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-200 mb-6 border-b pb-2">
                🛠️ Edit Project
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* Project Name */}
                <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-400 mb-1">
                        Project Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border text-gray-100 bg-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        placeholder="e.g. Website Redesign"
                        required
                    />
                </div>

                {/* Description */}
                <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-400 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        rows={5}
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border text-gray-100 bg-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        placeholder="Provide a short description of the project"
                    />
                </div>

                {/* Team */}
                <div className="col-span-1 w-full">
                    <label className="block text-sm font-semibold text-gray-400 mb-1">
                        Team
                    </label>
                    <select
                        name="team_id"
                        value={formData.team_id || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border text-gray-100 bg-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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

                {/* Status */}
                <div className="col-span-1 w-full">
                    <label className="block text-sm font-semibold text-gray-400 mb-1">
                        Status
                    </label>
                    <select
                        name="status_id"
                        value={formData.status_id || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border text-gray-100 bg-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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

                {/* Buttons */}
                <div className="col-span-2 flex justify-end gap-4 pt-4 mt-6">
                    <button
                        type="button"
                        onClick={onCloseForm}
                        className="px-6 py-2 rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-300 bg-gray-200"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center"
                        disabled={isLoading}
                    >
                        {isLoading && <Loader className="animate-spin mr-2" />}
                        {isLoading ? 'Updating...' : 'Update Project'}
                    </button>
                </div>
            </form>
        </div>
    )
}
