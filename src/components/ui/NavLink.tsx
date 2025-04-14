'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

type NavLinkProps = {
    label: string
    href: string
    icon: ReactNode
}

export default function NavLink({ label, href, icon }: NavLinkProps) {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link
            href={href}
            className={`capitalize transition flex items-center gap-2 text-sm ${
                isActive
                    ? 'pl-4 text-brand border-l-4 border-brand'
                    : 'hover:text-brand hover:border-l-4 hover:border-brand text-baseText italic pl-5'
            }`}
        >
            <span>{icon}</span>
            <p>{label}</p>
        </Link>
    )
}
