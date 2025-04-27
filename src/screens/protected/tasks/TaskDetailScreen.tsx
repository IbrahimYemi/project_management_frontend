'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import AppLayout from '@/components/app/AppLayout'
import ErrorPage from '@/components/cards/ErrorPage'
import { useFetchTask } from '@/hooks/tasks/useFetchTask'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/charts/ProgressBar'
import TruncateText from '@/components/ui/TruncateText'
import {
    ArrowLeft,
    Edit2Icon,
    FilePlus2,
    FileText,
    ImageIcon,
    MessageCircleMore,
    PlusCircleIcon,
    Trash,
} from 'lucide-react'
import FormDispatcher from '@/components/ui/FormDispatcher'
import Image from 'next/image'
import { appStorage } from '@/lib/generic.fn'
import { STORAGE_KEYS } from '@/store/constants'
import DeleteButton from '@/components/ui/DeleteButton'
import { useTaskActions } from '@/hooks/tasks/useTaskActions'
import { setAppState } from '@/store/slices/appStateSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

export default function TaskDetailScreen({ id }: { id: string }) {
    const { user } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const searchParams = useSearchParams()
    const tab = searchParams.get('tab') || 'overview'

    const {
        data: taskDetails,
        isLoading,
        isError,
        error,
    } = useFetchTask(id as string)

    const {
        deleteTask,
        isDeleteTaskLoading,
        isDeleteTaskSuccess,
        deleteTaskFile,
        deleteDiscussion,
    } = useTaskActions()

    const handleGoBack = React.useCallback(() => {
        router.push(`/projects/${taskDetails?.project?.id}`)
    }, [router, taskDetails?.project?.id])

    useEffect(() => {
        if (isDeleteTaskSuccess) {
            handleGoBack()
        }
    }, [handleGoBack, isDeleteTaskSuccess])

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const tab = urlParams.get('tab')

        if (tab === 'discussions') {
            const discussionElement = document.getElementById(
                'discussions-section',
            )
            if (discussionElement) {
                discussionElement.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }, [])

    if (isError) return <ErrorPage error={error} />

    const handleTabChange = (tabName: string) => {
        const newParams = new URLSearchParams()
        newParams.set('tab', tabName)
        router.push(`?${newParams.toString()}`, { scroll: false })
    }

    const handlePathIdPersist = () => {
        appStorage.persist(
            STORAGE_KEYS.RESOURCE_TO_EDIT,
            JSON.stringify({
                id: taskDetails?.id,
                project_id: taskDetails?.project.id,
                title: taskDetails?.name,
                description: taskDetails?.description,
                status_id: taskDetails?.status?.id,
                assigned_to: taskDetails?.owner?.id,
                due_date: taskDetails?.due_date,
                priority_name: taskDetails?.priority,
                taskImage: taskDetails?.taskImage,
            }),
        )
    }

    const loadingState = isLoading || isDeleteTaskLoading

    return (
        <AppLayout isLoading={loadingState}>
            {taskDetails && (
                <div className="space-y-6 mb-5">
                    {/* Tabs */}
                    <div className="flex items-center justify-between bg-baseColor text-white rounded-lg mb-5 px-4 py-2">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleGoBack}
                                className="bg-blue-500 flex gap-1 items-center text-white p-2 rounded-md text-sm md:text-base"
                            >
                                <ArrowLeft className="size-4" /> Back
                            </button>
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
                        <div className="flex items-center justify-end gap-2">
                            <FormDispatcher
                                text={
                                    <>
                                        <Edit2Icon className="size-3" />
                                        <h3>Edit Task</h3>
                                    </>
                                }
                                onOutsideClick={handlePathIdPersist}
                                type={'edit-task'}
                                classNames="bg-emerald-700 flex items-center gap-1 text-sm md:text-base text-white rounded-md text-center py-0.5 px-2"
                            />
                            <DeleteButton
                                text={<Trash />}
                                classNames="px-3 py-1 text-sm bg-red-500 text-white rounded"
                                onClick={() =>
                                    deleteTask({
                                        id: taskDetails?.id,
                                        projectId: taskDetails?.project?.id,
                                    })
                                }
                            />
                        </div>
                    </div>

                    {/* Tab Content */}
                    {tab === 'overview' && (
                        <Card className="shadow-lg rounded-xl bg-baseColor text-white">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">
                                    Task Details
                                </CardTitle>
                                <h2 className="block font-semibold mt-5">
                                    Name: {taskDetails?.name}
                                </h2>
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
                                <h2 className="block font-semibold">
                                    Description:
                                </h2>
                                <div className="overflow-x-auto">
                                    <p className="text-gray-100 mb-5 whitespace-pre-line">
                                        {taskDetails?.description}
                                    </p>
                                </div>
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
                        <div id="discussions-section">
                            <Card className="shadow-lg rounded-xl bg-baseColor">
                                <CardHeader className="border-b pb-0 mb-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg font-semibold inline-flex gap-2">
                                            <h2>Discussions</h2>
                                            <div className="flex items-center gap-0.5 ml-5">
                                                <span className="text-sm">
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
                                        </CardTitle>
                                        <FormDispatcher
                                            type="create-discussion"
                                            text={
                                                <span className="flex items-center gap-0.">
                                                    <span>comment</span>
                                                    <PlusCircleIcon className="w-5 h-5" />
                                                </span>
                                            }
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {taskDetails?.discussions?.length ? (
                                        <div className="space-y-2 w-full">
                                            {taskDetails?.discussions?.map(
                                                discussion => (
                                                    <div
                                                        key={discussion?.id}
                                                        className="flex gap-3 items-start p-2 border-b relative w-full"
                                                    >
                                                        <div className="w-12 h-12">
                                                            <Avatar
                                                                userImage={
                                                                    discussion
                                                                        ?.user
                                                                        .avatar
                                                                }
                                                                username={
                                                                    discussion
                                                                        ?.user
                                                                        .name
                                                                }
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold">
                                                                {
                                                                    discussion
                                                                        ?.user
                                                                        .name
                                                                }
                                                            </p>
                                                            <p className="text-gray-300">
                                                                {
                                                                    discussion?.message
                                                                }
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {new Date(
                                                                    discussion?.created_at,
                                                                ).toLocaleString()}
                                                            </p>
                                                        </div>
                                                        <div className="absolute top-0 right-0">
                                                            {new Date(
                                                                discussion?.created_at,
                                                            ).getTime() >
                                                                new Date().getTime() -
                                                                    5 *
                                                                        60 *
                                                                        1000 &&
                                                                (discussion
                                                                    ?.user
                                                                    ?.id ===
                                                                    user?.id ||
                                                                    taskDetails?.teamlead_id ===
                                                                        user?.id ||
                                                                    [
                                                                        'Admin',
                                                                        'Super Admin',
                                                                    ].includes(
                                                                        user?.app_role ??
                                                                            '',
                                                                    )) && (
                                                                    <DeleteButton
                                                                        text={
                                                                            <Trash />
                                                                        }
                                                                        classNames="text-sm text-red-500 font-bold"
                                                                        onClick={() => {
                                                                            dispatch(
                                                                                setAppState(
                                                                                    'isRequesting',
                                                                                ),
                                                                            )
                                                                            deleteDiscussion(
                                                                                {
                                                                                    id: discussion?.id,
                                                                                },
                                                                            )
                                                                        }}
                                                                        confirmStatement="Are you sure to delete this message?"
                                                                    />
                                                                )}
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
                        </div>
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
                                        {taskDetails?.files.map(file => (
                                            <li
                                                key={file?.id}
                                                className="flex items-center justify-between border-b p-2"
                                            >
                                                <a
                                                    href={file?.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-brand underline"
                                                >
                                                    {file?.type.startsWith(
                                                        'image',
                                                    ) ? (
                                                        <ImageIcon className="w-5 h-5 text-gray-400" />
                                                    ) : (
                                                        <FileText className="w-5 h-5 text-gray-400" />
                                                    )}
                                                    {file?.name}
                                                </a>
                                                <DeleteButton
                                                    text={<Trash />}
                                                    classNames="text-sm text-red-500 font-bold"
                                                    onClick={() => {
                                                        dispatch(
                                                            setAppState(
                                                                'isRequesting',
                                                            ),
                                                        )
                                                        deleteTaskFile({
                                                            id: file?.id,
                                                        })
                                                    }}
                                                    confirmStatement="Are you sure to delete this file?"
                                                />
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
