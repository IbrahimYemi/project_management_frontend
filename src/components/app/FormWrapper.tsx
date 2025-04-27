'use client'

import { useEffect, useRef } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { cancelFormDispatcher } from '@/store/slices/formDispatcherSlice'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import InviteUsersForm from '@/screens/protected/forms/InviteUsersForm'
import CreateTeamForm from '@/screens/protected/forms/CreateTeamForm'
import EditTeamForm from '@/screens/protected/forms/EditTeamForm'
import CreateProjectForm from '@/screens/protected/forms/CreateProjectForm'
import EditProjectForm from '@/screens/protected/forms/EditProjectForm'
import CreateNoteForm from '@/screens/protected/forms/CreateNoteForm'
import EditNoteForm from '@/screens/protected/forms/EditNoteForm'
import CreateScheduleForm from '@/screens/protected/forms/CreateScheduleForm'
import EditScheduleForm from '@/screens/protected/forms/EditScheduleForm'
import CreateTaskForm from '@/screens/protected/forms/CreateTaskForm'
import EditTaskForm from '@/screens/protected/forms/EditTaskForm'
import CreateTaskFileForm from '@/screens/protected/forms/CreateTaskFileForm'
import CreateDiscussionForm from '@/screens/protected/forms/CreateDiscussionForm'

export default function FormWrapper() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const formType = useAppSelector(
        state => state.formDispatched.formDispatcher,
    )
    const modalRef = useRef<HTMLDivElement>(null)
    const previousActiveElement = useRef<HTMLElement | null>(null)

    useEffect(() => {
        if (formType) {
            // Save the element that was focused before opening the modal
            previousActiveElement.current =
                document.activeElement as HTMLElement

            // Disable background interactions
            document.body.style.overflow = 'hidden'

            // Trap focus inside the modal
            const handleTabKey = (event: KeyboardEvent) => {
                if (!modalRef.current) return

                const focusableElements =
                    modalRef.current.querySelectorAll<HTMLElement>(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
                    )
                const firstElement = focusableElements[0]
                const lastElement =
                    focusableElements[focusableElements.length - 1]

                if (event.key === 'Tab') {
                    if (
                        event.shiftKey &&
                        document.activeElement === firstElement
                    ) {
                        event.preventDefault()
                        lastElement.focus()
                    } else if (
                        !event.shiftKey &&
                        document.activeElement === lastElement
                    ) {
                        event.preventDefault()
                        firstElement.focus()
                    }
                }
            }

            document.addEventListener('keydown', handleTabKey)

            return () => {
                document.removeEventListener('keydown', handleTabKey)
                document.body.style.overflow = ''

                // Restore focus to the previous active element
                previousActiveElement.current?.focus()
            }
        }
    }, [formType])

    const handleCloseForm = () => {
        const newParams = new URLSearchParams(searchParams.toString())
        newParams.delete('form-active-state')
        router.replace(`${pathname}?${newParams.toString()}`)
        dispatch(cancelFormDispatcher())
    }

    if (!formType) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-baseColor bg-opacity-80 backdrop-blur-sm z-[5000]">
            <div
                ref={modalRef}
                className="bg-gray-300 md:p-6 md:m-6 p-2 m-2 rounded w-full max-w-xl relative shadow-lg border border-gray-500 max-h-[95vh] overflow-y-auto"
            >
                <div className="flex items-center justify-between mb-4 w-full">
                    <h2 className="text-xl font-semibold text-gray-700">
                        Form Wrapper
                    </h2>

                    {/* Close Button */}
                    <button
                        className="text-gray-800 hover:text-gray-900 text-sm md:text-base"
                        onClick={handleCloseForm}
                        autoFocus
                    >
                        ✕
                    </button>
                </div>

                {/* Render the appropriate form */}
                {formType === 'users-invite' && (
                    <InviteUsersForm onCloseForm={handleCloseForm} />
                )}
                {formType === 'create-team' && (
                    <CreateTeamForm onCloseForm={handleCloseForm} />
                )}
                {formType === 'edit-team' && (
                    <EditTeamForm onCloseForm={handleCloseForm} />
                )}
                {formType === 'create-project' && (
                    <CreateProjectForm onCloseForm={handleCloseForm} />
                )}
                {formType === 'edit-project' && (
                    <EditProjectForm onCloseForm={handleCloseForm} />
                )}
                {formType === 'create-note' && (
                    <CreateNoteForm onCloseForm={handleCloseForm} />
                )}
                {formType === 'edit-note' && (
                    <EditNoteForm onCloseForm={handleCloseForm} />
                )}
                {formType === 'create-schedule' && (
                    <CreateScheduleForm onCloseForm={handleCloseForm} />
                )}
                {formType === 'edit-schedule' && (
                    <EditScheduleForm onCloseForm={handleCloseForm} />
                )}
                {formType === 'create-task' && (
                    <CreateTaskForm onCloseForm={handleCloseForm} />
                )}
                {formType === 'edit-task' && (
                    <EditTaskForm onCloseForm={handleCloseForm} />
                )}
                {formType === 'taskFile' && (
                    <CreateTaskFileForm onCloseForm={handleCloseForm} />
                )}
                {formType === 'create-discussion' && (
                    <CreateDiscussionForm onCloseForm={handleCloseForm} />
                )}
            </div>
        </div>
    )
}
