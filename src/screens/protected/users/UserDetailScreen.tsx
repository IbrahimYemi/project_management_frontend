import AppLayout from '@/components/app/AppLayout'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import UserProfile from './UserProfile'
import TaskProjectTable from '@/components/cards/tasks/TaskProjectTable'
import { useUserDetails } from '@/hooks/users/useUsers'
import ErrorPage from '@/components/cards/ErrorPage'
import { User } from '@/types/authTypes'

const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'tasks', label: 'Tasks Assigned' },
]

export default function UserDetailScreen({ id }: { id: string }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const activeTab = searchParams.get('user_tab') || 'details'

    const handleTabChange = (tabId: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('user_tab', tabId)
        router.push(`?${params.toString()}`, { scroll: false })
    }

    const { data, isLoading, isError, error } = useUserDetails({ id })

    if (isError) return <ErrorPage error={error} />

    return (
        <AppLayout isLoading={isLoading}>
            <div className="container mx-auto text-black bg-baseColor rounded-lg shadow-lg">
                <div className="w-full space-y-4 p-2 md:p-4">
                    <div className="flex gap-4 overflow-x-auto items-center">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`block w-fit text-left py-2 px-4 rounded-md text-nowrap ${
                                    activeTab === tab.id
                                        ? 'bg-teal-800 text-white'
                                        : 'hover:bg-teal-800 bg-gray-200 text-baseColor'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="py-4 md:py-8 mt-5">
                        {activeTab === 'details' && (
                            <UserProfile
                                user={data?.user ?? ({} as User)}
                                projects={data?.projects ?? []}
                            />
                        )}
                        {activeTab === 'tasks' && (
                            <div className="text-white">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-bold text-white">
                                        Assigned Tasks
                                    </h3>
                                </div>

                                <TaskProjectTable tasks={data?.tasks ?? []} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
