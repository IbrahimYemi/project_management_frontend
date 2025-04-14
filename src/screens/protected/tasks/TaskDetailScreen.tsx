'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import AppLayout from '@/components/app/AppLayout'
import ErrorPage from '@/components/cards/ErrorPage'
import { useFetchTask } from '@/hooks/tasks/useFetchTask'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/charts/ProgressBar'
import TruncateText from '@/components/ui/TruncateText'
import { FilePlus2, FileText, ImageIcon, MessageCircleMore } from 'lucide-react'
import FormDispatcher from '@/components/ui/FormDispatcher'
import Image from 'next/image'

export default function TaskDetailScreen({ id }: { id: string }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const tab = searchParams.get('tab') || 'overview'

    const {
        data: taskDetails,
        isLoading,
        isError,
        error,
    } = useFetchTask(id as string)

    if (isError) return <ErrorPage error={error} />

    const handleTabChange = (tabName: string) => {
        const newParams = new URLSearchParams()
        newParams.set('tab', tabName)
        router.push(`?${newParams.toString()}`, { scroll: false })
    }

    return (
        <AppLayout isLoading={isLoading}>
            {taskDetails && (
                <div className="space-y-6 mb-5">
                    {/* Tabs */}
                    <div className="flex bg-baseColor text-white rounded-lg mb-5 px-4 py-2">
                        {['overview', 'discussions', 'files'].map(t => (
                            <button
                                key={t}
                                onClick={() => handleTabChange(t)}
                                className={`px-4 py-2 text-sm font-medium ${
                                    tab === t
                                        ? ' border-b-2 border-brand text-white'
                                        : 'text-gray-400'
                                }`}
                            >
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {tab === 'overview' && (
                        <Card className="shadow-lg rounded-xl bg-baseColor text-white">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">
                                    Task Details: {taskDetails?.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {taskDetails?.taskImage && (
                                    <div className="max-h-64 min-h-32 overflow-hidden mb-5 bg-gray-500 w-fit rounded-md">
                                        <Image
                                            src={taskDetails?.taskImage}
                                            alt="task image"
                                            className="rounded-md h-full w-auto bg-gray-500 object-cover"
                                            width={500}
                                            height={200}
                                            unoptimized
                                        />
                                    </div>
                                )}
                                <p className="text-gray-100 mb-5">
                                    {taskDetails?.description}
                                </p>
                                <div className="flex items-center gap-3 mb-5">
                                    <Avatar
                                        userImage={taskDetails?.owner.avatar}
                                        username={taskDetails?.owner.name}
                                    />
                                    <div>
                                        <p className="font-semibold">
                                            {taskDetails?.owner.name}
                                        </p>
                                        <p className="text-sm text-gray-300">
                                            {taskDetails?.project.name}
                                        </p>
                                    </div>
                                    <Badge priority={taskDetails?.priority} />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-300">
                                        Progress
                                    </span>
                                    <span className="text-sm font-semibold">
                                        {taskDetails?.percentage}%
                                    </span>
                                </div>
                                <ProgressBar
                                    percentage={taskDetails?.percentage}
                                />
                            </CardContent>
                        </Card>
                    )}

                    {tab === 'discussions' && (
                        <Card className="shadow-lg rounded-xl bg-baseColor">
                            <CardHeader className="border-b pb-0 mb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg font-semibold inline-flex">
                                        Discussions
                                    </CardTitle>
                                    <FormDispatcher
                                        type="discussion"
                                        text={
                                            <div className="relative flex items-center gap-0.5">
                                                <span className="text-sm mt-0.5">
                                                    <TruncateText
                                                        text={String(
                                                            taskDetails?.taskDiscussionCount ||
                                                                0,
                                                        )}
                                                        limit={2}
                                                    />
                                                </span>
                                                <MessageCircleMore className="w-5 h-5 cursor-pointer" />
                                            </div>
                                        }
                                    />
                                </div>
                            </CardHeader>
                            <CardContent>
                                {taskDetails?.discussions?.length ? (
                                    <div className="space-y-2">
                                        {taskDetails?.discussions?.map(
                                            discussion => (
                                                <div
                                                    key={discussion.id}
                                                    className="flex gap-3 items-start p-2 border-b"
                                                >
                                                    <Avatar
                                                        userImage={
                                                            discussion.user
                                                                .avatar
                                                        }
                                                        username={
                                                            discussion.user.name
                                                        }
                                                    />
                                                    <div>
                                                        <p className="font-semibold">
                                                            {
                                                                discussion.user
                                                                    .name
                                                            }
                                                        </p>
                                                        <p className="text-gray-300">
                                                            {discussion.message}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {new Date(
                                                                discussion.created_at,
                                                            ).toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-gray-400 text-center py-5">
                                        No discussions yet. Be the first to
                                        start one!
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {tab === 'files' && (
                        <Card className="shadow-lg rounded-xl bg-baseColor">
                            <CardHeader className="border-b pb-0 mb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg font-semibold inline-flex">
                                        Files (
                                        <span className="">
                                            <TruncateText
                                                text={String(
                                                    taskDetails?.taskFileCount ||
                                                        0,
                                                )}
                                                limit={2}
                                            />
                                        </span>
                                        )
                                    </CardTitle>
                                    <FormDispatcher
                                        type="taskFile"
                                        text={
                                            <div className="relative flex items-center gap-1 hover:underline">
                                                Add New
                                                <FilePlus2 className="w-5 h-5 cursor-pointer" />
                                            </div>
                                        }
                                    />
                                </div>
                            </CardHeader>
                            <CardContent>
                                {taskDetails?.files?.length ? (
                                    <ul className="space-y-2">
                                        {taskDetails.files.map(file => (
                                            <li
                                                key={file.id}
                                                className="flex items-center justify-between border-b p-2"
                                            >
                                                <a
                                                    href={file.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-brand underline"
                                                >
                                                    {file.type.startsWith(
                                                        'image',
                                                    ) ? (
                                                        <ImageIcon className="w-5 h-5 text-gray-400" />
                                                    ) : (
                                                        <FileText className="w-5 h-5 text-gray-400" />
                                                    )}
                                                    {file.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-400 text-center py-5">
                                        No files uploaded for this task.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}
        </AppLayout>
    )
}
