'use client'

import { useSchedules } from '@/hooks/schedules/useSchedules'
import { Loader, PlusSquareIcon } from 'lucide-react'
import { ErrorComponent } from '@/components/cards/ErrorComponent'
import MeetingsTable from '@/components/tables/MeetingsTable'
import FormDispatcher from '@/components/ui/FormDispatcher'
import { appStorage } from '@/lib/generic.fn'
import { STORAGE_KEYS } from '@/store/constants'
import { useScheduleActions } from '@/hooks/schedules/useScheduleActions'
import { useAppDispatch } from '@/store/hooks'
import { setAppState } from '@/store/slices/appStateSlice'

export default function MeetingScreen({ projectId }: { projectId: string }) {
    const dispatch = useAppDispatch()
    const { data: schedules, isLoading, isError } = useSchedules({ projectId })
    const { deleteSchedule } = useScheduleActions()

    if (isError)
        return <ErrorComponent errorMessage="Error loading schedules" />

    const handlePathIdPersist = () => {
        appStorage.persist(STORAGE_KEYS.ACTIVE_PATH_ID, projectId)
    }

    const handleDelete = (id: string) => {
        dispatch(setAppState('isRequesting'))
        deleteSchedule(id)
    }

    return isLoading ? (
        <div className="flex items-center justify-center h-full text-white m-6 md:mt-24">
            <Loader className="animate-spin" /> Loading...
        </div>
    ) : (
        <div className="py-2 md:py-6 w-full overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Schedule</h2>
                <FormDispatcher
                    text={
                        <>
                            <PlusSquareIcon className="size-3" />
                            <h3>Add Schedule</h3>
                        </>
                    }
                    onOutsideClick={handlePathIdPersist}
                    type={'create-schedule'}
                    classNames="bg-emerald-700 flex items-center gap-1 text-sm md:text-base text-white rounded-md text-center py-0.5 px-2"
                />
            </div>
            <MeetingsTable
                schedules={schedules}
                onDelete={id => handleDelete(id)}
            />
        </div>
    )
}
