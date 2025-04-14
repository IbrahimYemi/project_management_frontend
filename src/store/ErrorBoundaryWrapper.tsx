'use client'

import ErrorFallback from '@/components/layouts/ErrorFallback'
import { ErrorBoundary } from 'react-error-boundary'

export default function ErrorBoundaryWrapper({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            {children}
        </ErrorBoundary>
    )
}
