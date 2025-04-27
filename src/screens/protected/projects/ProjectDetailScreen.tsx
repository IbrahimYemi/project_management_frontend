'use client'

import { useFetchProject } from '@/hooks/projects/useFetchProject'
import AppLayout from '@/components/app/AppLayout'
import { useEffect, useState } from 'react'
import Tabs from '@/components/ui/Tabs'
import ProjectOverview from '@/components/cards/ProjectOverview'
import TeamMembers from '@/components/cards/TeamMembers'
import TasksList from '@/components/cards/TasksList'
import { Team } from '@/types/teams'
import MeetingScreen from '../meetings/MeetingScreen'
import FormDispatcher from '@/components/ui/FormDispatcher'
import { appStorage } from '@/lib/generic.fn'
import { STORAGE_KEYS } from '@/store/constants'
import { Edit2Icon } from 'lucide-react'
import NoteTab from './NoteTab'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import ErrorPage from '@/components/cards/ErrorPage'

export default function ProjectDetailScreen({ id }: { id: string }) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const tabFromQuery = searchParams.get('project_tab')
    const {
        data: projectData,
        isLoading,
        isError,
        error,
    } = useFetchProject(id as string)

    const [activeTab, setActiveTab] = useState('overview')

    useEffect(() => {
        if (tabFromQuery) {
            setActiveTab(tabFromQuery)
        }
    }, [tabFromQuery])

    const updateTabQueryParam = (tab: string) => {
        const newParams = new URLSearchParams(searchParams.toString())
        newParams.set('project_tab', tab)

        router.replace(`${pathname}?${newParams.toString()}`)
        setActiveTab(tab)
    }

    const handlePathIdPersist = () => {
        appStorage.persist(
            STORAGE_KEYS.ACTIVE_PATH_ID,
            projectData?.project?.id || '',
        )
    }

    if (isError) return <ErrorPage error={error} />

    return (
        <AppLayout isLoading={isLoading}>
            <div className="p-2 md:p-6 bg-baseColor w-full text-white rounded-md shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">
                        {projectData?.project.name}
                    </h2>
                    <FormDispatcher
                        text={
                            <>
                                <Edit2Icon className="size-3" />
                                <h3 className="text-sm md:text-base">
                                    Edit Project
                                </h3>
                            </>
                        }
                        onOutsideClick={handlePathIdPersist}
                        type={'edit-project'}
                        classNames="bg-emerald-700 flex items-center gap-1 text-sm md:text-base text-white rounded-md text-center py-0.5 px-2"
                    />
                </div>
                <Tabs
                    activeTab={activeTab}
                    setActiveTab={updateTabQueryParam}
                />

                <div className="mt-6">
                    {activeTab === 'overview' && projectData?.project && (
                        <ProjectOverview project={projectData.project} />
                    )}
                    {activeTab === 'team' && (
                        <TeamMembers
                            bgStyle="bg-baseColor text-white"
                            team={projectData?.team ?? ({} as Team)}
                            members={projectData?.members ?? []}
                        />
                    )}
                    {activeTab === 'tasks' && (
                        <TasksList
                            projectId={projectData?.project.id ?? ''}
                            status={projectData?.project.task_status ?? []}
                            tasks={projectData?.tasks ?? []}
                        />
                    )}
                    {activeTab === 'meetings' && projectData?.project?.id && (
                        <MeetingScreen projectId={projectData.project.id} />
                    )}
                    {activeTab === 'notes' && projectData?.project?.id && (
                        <NoteTab id={projectData?.project?.id} />
                    )}
                </div>
            </div>
        </AppLayout>
    )
}
