'use client'

import ErrorPage from '@/components/cards/ErrorPage'
import { useParams } from 'next/navigation'
import UserDetailScreen from '@/screens/protected/users/UserDetailScreen'

export default function UserPage() {
    const { id } = useParams()

    if (!id || Array.isArray(id)) {
        return <ErrorPage error={'Invalid user ID'} />
    }

    return <UserDetailScreen id={id} />
}
