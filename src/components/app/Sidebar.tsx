'use client'

import { useState } from 'react'
import {
    ChevronDown,
    ChevronUp,
    X,
    GalleryVerticalEnd,
    Aperture,
} from 'lucide-react'
import NavLink from '../ui/NavLink'
import Link from 'next/link'
import HorizontalLine from '../ui/HorizontalLine'
import UserDetails from '../cards/UserDetails'
import { useAppSelector } from '@/store/hooks'
import { links, tasks } from '@/store/RoughData'
import { motion } from 'framer-motion'

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
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

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
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
                <div className="h-8 w-8 bg-brand text-complement rounded-md flex items-center justify-center">
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
                        <ul className="space-y-2 overflow-y-auto max-h-40 md:max-h-20  2xl:max-h-60 border-l border-gray-300 p-2">
                            {tasks.map((user, index) => (
                                <Link
                                    key={index}
                                    href={`/tasks/${user}`}
                                    className="text-xs flex items-center gap-2 hover:underline"
                                >
                                    <Aperture className="size-2" /> {user}
                                    &apos;s Tasks
                                </Link>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="absolute bottom-0 w-full h-auto z-10 flex flex-col">
                <button className="bg-white mb-5 rounded-md font-bold text-brand text-sm p-2 w-3/4 mx-auto hover:bg-complement">
                    Create New Project
                </button>
                <HorizontalLine />
                <UserDetails authUser={authUser} />
            </div>
        </motion.div>
    )
}
