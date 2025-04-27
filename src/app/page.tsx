'use client'

import Loading from '@/components/cards/loading'
import { appStorage } from '@/lib/generic.fn'
import { STORAGE_KEYS } from '@/store/constants'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function HomeScreen() {
    const token = appStorage.retrieve(STORAGE_KEYS.AUTH_TOKEN)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (token) {
            setLoading(false)
        }

        setLoading(false)
    }, [token])

    if (loading) {
        return <Loading />
    }

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="h-screen flex flex-col items-center justify-center text-center px-6 bg-baseColor text-white">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
                    Manage Projects Like a Pro 🚀
                </h1>
                <p className="text-lg md:text-xl mb-6 max-w-3xl text-gray-200">
                    Empower your teams to collaborate, track tasks, hold
                    meetings, and get work done faster – all in one place.
                </p>
                <div className="space-x-4">
                    {token ? (
                        <Link
                            href="/dashboard"
                            className="px-8 py-3 bg-white text-green-400 font-semibold rounded-full shadow-lg transition transform hover:scale-105 hover:bg-gray-100"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href="/auth/register"
                                className="px-8 py-3 bg-white text-green-400 font-semibold rounded-full shadow-lg transition transform hover:scale-105 hover:bg-gray-100"
                            >
                                Get Started
                            </Link>
                            <Link
                                href="/auth/login"
                                className="px-8 py-3 bg-green-700 text-white font-semibold rounded-full shadow-lg transition transform hover:scale-105 hover:bg-green-400"
                            >
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 bg-white text-gray-900">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold mb-12 text-green-400">
                        Key Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: '📁',
                                title: 'Projects',
                                description:
                                    'Create and manage multiple projects with ease.',
                            },
                            {
                                icon: '👥',
                                title: 'Teams',
                                description:
                                    'Collaborate with your team and assign tasks seamlessly.',
                            },
                            {
                                icon: '✅',
                                title: 'Tasks',
                                description:
                                    'Organize tasks, track progress, and hit your goals.',
                            },
                            {
                                icon: '📅',
                                title: 'Meetings',
                                description:
                                    'Schedule and manage team meetings effortlessly.',
                            },
                            {
                                icon: '💬',
                                title: 'Discussions',
                                description:
                                    'Communicate on tasks with contextual discussions.',
                            },
                            {
                                icon: '🔐',
                                title: 'Role-Based Access',
                                description:
                                    'Control user permissions for secure collaboration.',
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="p-6 bg-gray-50 border border-green-100 rounded-md shadow-md transform transition hover:-translate-y-2 hover:shadow-lg"
                            >
                                <div className="text-4xl mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-2 text-green-700">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call-to-Action */}
            <section className="bg-baseColor text-white py-16 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                    Ready to Transform Your Workflow?
                </h2>
                <p className="text-lg mb-6 text-gray-200">
                    Sign up today and start managing your projects efficiently.
                </p>
                <Link
                    href="/auth/register"
                    className="px-8 py-3 bg-white text-green-900 font-semibold rounded-full shadow-lg transition transform hover:scale-105 hover:bg-gray-100"
                >
                    Get Started Now
                </Link>
            </section>

            {/* Footer */}
            <footer className="py-6 bg-baseColor text-center text-baseText">
                <p>
                    &copy; {new Date().getFullYear()} Workflowz. All
                    rights reserved.
                </p>
            </footer>
        </div>
    )
}
