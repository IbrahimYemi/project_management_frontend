'use client'

import React from 'react'
import AppLayout from '../app/AppLayout'
import { STORAGE_KEYS } from '@/store/constants'
import { appStorage } from '@/lib/generic.fn'
import { ErrorComponent } from './ErrorComponent'
import { AxiosError } from 'axios'
import { ApiErrorResponse } from '@/types/generic'

interface ErrorProps {
    error?: Error | string | AxiosError<ApiErrorResponse>
}

export default function ErrorPage({ error }: ErrorProps) {
    const token = appStorage.retrieve(STORAGE_KEYS.AUTH_TOKEN)

    const getErrorDetails = (statusCode: number) => {
        switch (statusCode) {
            case 404:
                return {
                    title: 'Resource Not Found',
                    message:
                        'The resource you are looking for could not be found.',
                }
            case 403:
                return {
                    title: 'Forbidden',
                    message:
                        'You do not have permission to access this resource.',
                }
            case 500:
                return {
                    title: 'Internal Server Error',
                    message:
                        'Something went wrong on our end. Please try again later.',
                }
            default:
                return {
                    title: 'Error',
                    message: 'An unknown error occurred.',
                }
        }
    }

    const { message: errorMessage, title: errorTitle } = getErrorDetails(
        typeof error === 'string'
            ? 500
            : (error as AxiosError<ApiErrorResponse>)?.response?.status || 500,
    )

    return token ? (
        <AppLayout>
            <div className="min-h-[90vh] flex items-center justify-center bg-baseColor">
                <ErrorComponent
                    errorMessage={errorMessage}
                    errorTitle={errorTitle}
                />
            </div>
        </AppLayout>
    ) : (
        <ErrorComponent errorMessage={errorMessage} errorTitle={errorTitle} />
    )
}
