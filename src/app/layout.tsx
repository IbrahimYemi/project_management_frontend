import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import ReduxProviders from '@/store/ReduxProviders'
import TanstackProvider from '@/store/TanstackProvider'
import ToastProvider from '@/store/ToastProvider'
import ErrorBoundaryWrapper from '@/store/ErrorBoundaryWrapper'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Workflows',
    description: 'Collaborate with teams on projects faster and better!',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-muted antialiased`}
            >
                <ErrorBoundaryWrapper>
                    <TanstackProvider>
                        <ReduxProviders>
                            <ToastProvider>{children}</ToastProvider>
                        </ReduxProviders>
                    </TanstackProvider>
                </ErrorBoundaryWrapper>
            </body>
        </html>
    )
}
