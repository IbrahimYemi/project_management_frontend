/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Loader } from 'lucide-react'
import { useAllUsers } from '@/hooks/users/useUsers'
import { CreateTeamParams } from '@/types/teams'
import { User } from '@/types/authTypes'
import { useTeamActions } from '@/hooks/teams/useTeamActions'
import { STORAGE_KEYS } from '@/store/constants'
import { appStorage } from '@/lib/generic.fn'
import { useFetchTeam } from '@/hooks/teams/useFetchTeam'

type EditTeamFormProps = {
    onCloseForm: () => void
}

export default function EditTeamForm({ onCloseForm }: EditTeamFormProps) {
    const [teamIdUsed, setTeamIdUsed] = useState<string | null>(null)
    const { data: cachedTeamDetails } = useFetchTeam(teamIdUsed || '')

    useEffect(() => {
        const teamId = appStorage.retrieve(STORAGE_KEYS.ACTIVE_PATH_ID)
        if (teamId) {
            setTeamIdUsed(teamId)
        } else {
            onCloseForm()
        }
    }, [])

    const {
        editTeam,
        isEditTeamLoading: isLoading,
        isEditTeamSuccess: isSuccess,
    } = useTeamActions()
    const { isLoading: isFetchingUsers, data: users } = useAllUsers()

    const [formData, setFormData] = useState<CreateTeamParams>({
        name: '',
        team_lead_id: '',
        members: [],
    })

    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        if (cachedTeamDetails) {
            const teamLeadId = cachedTeamDetails?.team_members?.find(
                (member: User) => member.role === 'Team Lead',
            )?.id

            setFormData({
                name: cachedTeamDetails.name || '',
                team_lead_id: teamLeadId || '',
                members:
                    cachedTeamDetails.team_members?.map(
                        (member: User) => member.id,
                    ) || [],
            })
        }
    }, [cachedTeamDetails])

    useEffect(() => {
        if (isSuccess) {
            onCloseForm()
        }
    }, [isSuccess, onCloseForm])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleMembersChange = (id: string) => {
        setFormData(prev => ({
            ...prev,
            members: prev.members.includes(id)
                ? prev.members.filter(memberId => memberId !== id)
                : [...prev.members, id],
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name || !formData.team_lead_id) {
            toast.error('Please fill in all required fields')
            return
        }

        const updatedMembers = Array.from(
            new Set([...formData.members, formData.team_lead_id]),
        )

        try {
            await editTeam({
                id: cachedTeamDetails?.id as string,
                data: { ...formData, members: updatedMembers },
            })
        } catch {
            toast.error('Failed to update team')
        }
    }

    if (isFetchingUsers) {
        return (
            <div className="flex items-center justify-center h-full text-baseColor m-6">
                <Loader className="animate-spin" /> Loading...
            </div>
        )
    }

    const filteredUsers = users?.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const eligibleTeamLeads = filteredUsers?.filter(user =>
        ['super admin', 'admin', 'team lead'].includes(user?.role.toLowerCase() || ''),
    )

    return (
        <div className="p-6 bg-baseColor text-gray-100 rounded-lg shadow-lg min-w-96 max-w-full animate-fadeIn w-full">
            <div className="flex items-center justify-between flex-wrap gap-5">
                <h2 className="text-xl font-semibold text-gray-200 mb-4 text-nowrap">
                    Edit {cachedTeamDetails?.name || 'Teams'}
                </h2>

                {/* Search Input */}
                <div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none text-gray-100 bg-gray-500"
                        placeholder="Search by name..."
                    />
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-400">
                        Team Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none text-gray-100 bg-gray-700"
                        placeholder="Enter team name"
                        required
                    />
                </div>

                {/* Team Lead */}
                <div>
                    <label className="block text-sm font-medium text-gray-400">
                        Team Lead
                    </label>
                    <select
                        name="team_lead_id"
                        value={formData.team_lead_id}
                        onChange={handleChange}
                        className="w-full px-3 py-2 mt-5 border rounded-lg focus:ring-2 focus:outline-none text-gray-100 bg-gray-700"
                        required
                    >
                        <option className="text-gray-100" value="">
                            Select a team lead
                        </option>
                        {eligibleTeamLeads?.map(({ id, name }: User) => (
                            <option
                                className="text-gray-200"
                                key={id}
                                value={id}
                            >
                                {name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Members */}
                <div className="h-32 overflow-y-auto">
                    <label className="block text-sm font-medium text-gray-400">
                        Members
                    </label>
                    <div className="flex flex-wrap gap-2 text-gray-200 mt-5">
                        {filteredUsers?.map(({ id, name }: User) => (
                            <label
                                key={id}
                                className="flex items-center space-x-2"
                            >
                                <input
                                    type="checkbox"
                                    value={id}
                                    checked={formData.members.includes(id)}
                                    onChange={() => handleMembersChange(id)}
                                    className="rounded border-gray-300 text-brand focus:ring-brand"
                                />
                                <span>{name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-400 transition"
                        onClick={onCloseForm}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg transition flex items-center"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className="animate-spin" /> : null}
                        {isLoading ? 'Updating...' : 'Update Team'}
                    </button>
                </div>
            </form>
        </div>
    )
}
