'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Loader } from 'lucide-react'
import { appStorage } from '@/lib/generic.fn'
import { STORAGE_KEYS } from '@/store/constants'
import { useScheduleActions } from '@/hooks/schedules/useScheduleActions'

type CreateScheduleFormProps = {
    onCloseForm: () => void
}

export default function CreateScheduleForm({
    onCloseForm,
}: CreateScheduleFormProps) {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        agenda: '',
        link: '',
        project_id: '',
        team_id: '',
        task_id: '',
    })

    const {
        createSchedule,
        isCreateScheduleLoading: isCreating,
        isCreateScheduleSuccess: isSuccess,
    } = useScheduleActions()

    useEffect(() => {
        const projectId = appStorage.retrieve(STORAGE_KEYS.ACTIVE_PATH_ID)
        if (projectId) {
            setFormData(prev => ({ ...prev, project_id: projectId }))
        }
    }, [])

    useEffect(() => {
        if (isSuccess) onCloseForm()
    }, [isSuccess, onCloseForm])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.date || !formData.time || !formData.agenda) {
            toast.error('Date, time, and agenda are required')
            return
        }

        try {
            await createSchedule(formData)
        } catch {
            toast.error('Failed to create schedule')
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-baseColor rounded-xl shadow-lg animate-fadeIn text-gray-100">
            <h2 className="text-xl font-bold mb-4">📅 Create Schedule</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1 text-gray-400">
                        Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        className="w-full border bg-gray-700 border-gray-300 px-4 text-gray-100 py-2 rounded-lg"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1 text-gray-400">
                        Time
                    </label>
                    <input
                        type="time"
                        name="time"
                        className="w-full border bg-gray-700 border-gray-300 px-4 text-gray-100 py-2 rounded-lg"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1 text-gray-400">
                        Agenda
                    </label>
                    <textarea
                        name="agenda"
                        placeholder="Enter schedule agenda"
                        rows={2}
                        className="w-full border bg-gray-700 border-gray-300 px-4 text-gray-100 py-2 rounded-lg"
                        value={formData.agenda}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1 text-gray-400">
                        Meeting Link (optional)
                    </label>
                    <input
                        type="url"
                        name="link"
                        placeholder="https://example.com/meeting"
                        className="w-full border bg-gray-700 border-gray-300 px-4 text-gray-100 py-2 rounded-lg"
                        value={formData.link}
                        onChange={handleChange}
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
                        disabled={isCreating}
                    >
                        {isCreating && <Loader className="animate-spin mr-2" />}
                        {isCreating ? 'Saving...' : 'Save Schedule'}
                    </button>
                </div>
            </form>
        </div>
    )
}
