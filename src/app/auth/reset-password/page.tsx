'use client'

import { GalleryVerticalEnd } from 'lucide-react'
import { ResetPasswordScreen } from '@/screens/auth/ResetPasswordScreen'
import Link from 'next/link'
import GuestLayout from '@/components/layout.tsx/GuestLayout'

export default function ResetPasswordPage() {
    return (
        <GuestLayout>
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
                    <ResetPasswordScreen />
                </div>
            </div>
        </GuestLayout>
    )
}
