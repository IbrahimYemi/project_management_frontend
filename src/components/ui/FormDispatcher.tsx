import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setFormDispatcher } from '@/store/slices/formDispatcherSlice'
import { FormDispatchedTypes } from '@/types/generic'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ReactNode } from 'react'
import { toast } from 'react-toastify'

type Props = {
    text: ReactNode
    type: FormDispatchedTypes
    classNames?: string
    onOutsideClick?: () => void
}

export default function FormDispatcher({
    text,
    type,
    classNames = '',
    onOutsideClick,
}: Props) {
    const { user: authUser } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const handleDispatchEvent = () => {
        if (
            (type === 'create-project' ||
                type === 'create-team' ||
                type === 'edit-project' ||
                type === 'edit-team') &&
            authUser?.app_role !== 'Super Admin' &&
            authUser?.app_role !== 'Admin'
        ) {
            toast.error('You are not authorized to perform this action.')
            return
        }

        if (
            (type === 'create-schedule' ||
                type === 'edit-schedule' ||
                type === 'edit-task') &&
            authUser?.app_role !== 'Super Admin' &&
            authUser?.app_role !== 'Admin' &&
            authUser?.app_role !== 'Team Lead'
        ) {
            toast.error('You are not authorized to perform this action.')
            return
        }

        if (onOutsideClick) onOutsideClick()
        const newParams = new URLSearchParams(searchParams.toString())
        newParams.set('form-active-state', type || '')

        router.replace(`${pathname}?${newParams.toString()}`)
        dispatch(setFormDispatcher(type))
    }

    return (
        <button
            className={`${classNames} py-2 px-4 rounded transition`}
            onClick={handleDispatchEvent}
        >
            {text}
        </button>
    )
}
