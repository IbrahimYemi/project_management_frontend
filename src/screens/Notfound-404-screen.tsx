'use client'

import NotFoundPage from '@/components/app/NotFound'
import { appStorage } from '@/lib/generic.fn'
import { AUTH_TOKEN_STORAGE_KEY } from '@/store/constants'
import Link from 'next/link'
import React from 'react'

export default function NotfoundScreen() {
    const token = appStorage.retrieve(AUTH_TOKEN_STORAGE_KEY)

    return token ? (
        <NotFoundPage />
    ) : (
        <div
            className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage:
                    'url(https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            }}
        >
            <div className="max-w-md mx-auto text-center bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
                <div className="text-9xl font-bold text-indigo-600 mb-4">
                    404
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-6">
                    Oops! Page Not Found
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    The page you&apos;re looking for seems to have gone on a
                    little adventure. Don&apos;t worry, we&apos;ll help you find
                    your way back home.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    )
}
