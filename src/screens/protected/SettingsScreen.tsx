'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import AppLayout from '@/components/app/AppLayout'
import AccountSettings from '@/components/settings/AccountSettings'
import ProfileSettings from '@/components/settings/ProfileSettings'
import React, { Suspense } from 'react'
import PersonalNotes from '@/components/settings/PersonalNotes'
import { useAppSelector } from '@/store/hooks'
import { User } from '@/types/authTypes'
import Loading from '@/components/cards/loading'

const tabs = [
    { id: 'account', label: 'Account Details' },
    { id: 'profile', label: 'Profile Settings' },
    { id: 'note-taking', label: 'Personal Notes' },
]

function SettingsContent() {
    const { user } = useAppSelector(state => state.auth)
    const searchParams = useSearchParams()
    const router = useRouter()

    const activeTab = searchParams.get('tab') || 'account' // Default to 'account'
    const isLoading = false

    const handleTabChange = (tabId: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('tab', tabId)
        router.push(`?${params.toString()}`, { scroll: false })
    }

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
                    <div>
                        {activeTab === 'account' && (
                            <AccountSettings user={user || ({} as User)} />
                        )}
                        {activeTab === 'profile' && <ProfileSettings />}
                        {activeTab === 'note-taking' && <PersonalNotes />}
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default function SettingsScreen() {
    return (
        <Suspense fallback={<Loading />}>
            <SettingsContent />
        </Suspense>
    )
}
