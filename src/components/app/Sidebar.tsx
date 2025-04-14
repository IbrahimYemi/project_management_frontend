'use client'

import { useState } from 'react'
import {
    ChevronDown,
    ChevronUp,
    X,
    GalleryVerticalEnd,
    Aperture,
    PlusSquareIcon,
    Loader,
} from 'lucide-react'
import NavLink from '../ui/NavLink'
import Link from 'next/link'
import HorizontalLine from '../ui/HorizontalLine'
import UserDetails from '../cards/UserDetails'
import { useAppSelector } from '@/store/hooks'
import { links } from '@/store/RoughData'
import { motion } from 'framer-motion'
import FormDispatcher from '../ui/FormDispatcher'
import { useProjectActions } from '@/hooks/projects/useProjectActions'
import { Projects } from '@/types/projects'

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
    notificationCount: number
}

const navContainerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }, // Delay between each link animation
    },
}

const navItemVariants = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } },
}

export default function Sidebar({
    isOpen,
    onClose,
    notificationCount,
}: SidebarProps) {
    const { myProjects, isMyProjectsLoading, isMyProjectsError } =
        useProjectActions()
    const [tasksOpen, setTasksOpen] = useState(false)
    const { user: authUser } = useAppSelector(state => state.auth)

    const definition = authUser?.role === 'Member' ? 'Tasks' : 'Projects'

    return (
        <motion.div
            className={`fixed z-[5000] inset-y-0 left-0 w-full max-w-64 rounded-r-md md:rounded-md bg-baseColor duration-1000 text-baseText transition-transform transform ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 md:static md:w-64`}
        >
            {/* Mobile Close Button */}
            <div className="absolute top-4 right-4 md:hidden">
                <button onClick={onClose}>
                    <X className="text-complement w-5 h-5" />
                </button>
            </div>

            {/* Logo & Company Name */}
            <Link href="/" className="flex items-center space-x-2 p-4 md:h-20">
                <div className="h-8 w-8 bg-emerald-600 text-complement rounded-md flex items-center justify-center">
                    <GalleryVerticalEnd className="size-7" />
                </div>
                <span className="text-lg font-bold">Acme Inc</span>
            </Link>
            <HorizontalLine />
            <div className="mt-2 gap-2 max-h-auto">
                {/* Navigation Links */}
                <h2 className="text-titleText font-semibold mb-3 pl-5 text-sm">
                    Menu
                </h2>
                {/* Navigation Links with Motion */}
                <motion.nav
                    initial="hidden"
                    animate="show"
                    variants={navContainerVariants}
                    className="space-y-4"
                >
                    {links.map(({ label, href, Icon }, index) => (
                        <motion.div key={index} variants={navItemVariants}>
                            <NavLink
                                href={href}
                                label={label}
                                icon={<Icon className="size-4" />}
                            />
                        </motion.div>
                    ))}
                </motion.nav>
                <HorizontalLine className="mt-5" />

                {/* Collapsible User Tasks Section */}
                <div className="p-4">
                    <button
                        className="flex items-center w-full text-left text-titleText font-semibold mb-3 text-sm"
                        onClick={() => setTasksOpen(!tasksOpen)}
                    >
                        <span>{definition}</span>
                        {tasksOpen ? <ChevronUp /> : <ChevronDown />}
                    </button>

                    {tasksOpen && (
                        <div className="space-y-2 overflow-y-auto max-h-40 md:max-h-20 2xl:max-h-60 border-l border-gray-300 p-2">
                            {isMyProjectsLoading && (
                                <div className="flex items-center justify-center h-full text-gray-400 m-4">
                                    <Loader className="animate-spin mr-2" />
                                    <span>Loading projects...</span>
                                </div>
                            )}

                            {isMyProjectsError && (
                                <div className="flex items-center justify-center h-full text-red-400 m-4">
                                    <p>Error loading projects</p>
                                </div>
                            )}

                            {!isMyProjectsLoading &&
                                !isMyProjectsError &&
                                myProjects?.length === 0 && (
                                    <div className="text-xs text-gray-400 text-center">
                                        No projects found.
                                    </div>
                                )}

                            {!isMyProjectsLoading &&
                                !isMyProjectsError &&
                                myProjects?.map(({ id, name }: Projects) => (
                                    <Link
                                        key={id}
                                        href={`/projects/${id}`}
                                        className="text-xs flex items-center gap-2 hover:underline"
                                    >
                                        <Aperture className="size-2" />
                                        {name}
                                    </Link>
                                ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="absolute bottom-0 w-full h-auto z-10 flex flex-col">
                <FormDispatcher
                    text={
                        <>
                            <PlusSquareIcon className="w-4 h-4" />
                            <h3>Create New Project</h3>
                        </>
                    }
                    type={'create-project'}
                    classNames="flex items-center gap-2 bg-white mb-5 rounded-md font-bold text-brand text-sm p-2 w-3/4 mx-auto hover:bg-complement"
                />
                <HorizontalLine />
                <UserDetails
                    notificationCount={notificationCount}
                    authUser={authUser}
                />
            </div>
        </motion.div>
    )
}
