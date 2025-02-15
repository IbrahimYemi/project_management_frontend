'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import LoginScreen from '@/screens/auth/LoginScreen'
import RegisterScreen from '@/screens/auth/RegisterScreen'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { setActiveTab } from '@/store/features/authTabSlice'
import Link from 'next/link'
import { GalleryVerticalEnd } from 'lucide-react'

export default function AuthPage() {
    const activeTab = useSelector((state: RootState) => state.authTab.activeTab)
    const searchParams = useSearchParams()
    const dispatch = useDispatch()

    useEffect(() => {
        const queryTab = searchParams.get('tab') as 'login' | 'register' | null
        if (queryTab && queryTab !== activeTab) {
            dispatch(setActiveTab(queryTab))
        }
    }, [searchParams, activeTab, dispatch])

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col items-center gap-6 p-5">
                <Link
                    href="/"
                    className="flex items-center gap-2 self-center font-medium"
                >
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    Acme Inc.
                </Link>
                {activeTab === 'login' && <LoginScreen />}
                {activeTab === 'register' && <RegisterScreen />}
            </div>
        </div>
    )
}
