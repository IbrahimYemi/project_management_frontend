import Link from 'next/link'
import { usePathname } from 'next/navigation'
import TruncateText from './TruncateText'

export default function Breadcrumbs() {
    const pathname = usePathname()

    // Convert pathname to breadcrumb links
    const resolvePathName = () => {
        const pathSegments = pathname.split('/').filter(Boolean)

        return pathSegments.map((segment, index) => {
            const url = `/${pathSegments.slice(0, index + 1).join('/')}`
            return { name: formatSegment(segment), url }
        })
    }

    // Format segment names (e.g., "user-management" -> "User Management")
    const formatSegment = (segment: string) => {
        return segment
            .replace(/-/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase())
    }

    const breadcrumbs = resolvePathName()

    return (
        <nav aria-label="breadcrumb">
            <ul className="flex items-center space-x-2 md:text-lg font-semibold capitalize text-baseColor">
                <li>
                    <Link
                        href="/dashboard"
                        className="hover:underline hidden md:inline-flex text-teal-800"
                    >
                        Dashboard
                    </Link>
                </li>
                {breadcrumbs.map((breadcrumb, index) => (
                    <li key={breadcrumb.url} className="flex items-center">
                        <span className="md:mx-1 inline-flex">/</span>
                        {index === breadcrumbs.length - 1 ? (
                            <span className="text-gray-500">
                                {index >= 1 ? (
                                    <TruncateText text={breadcrumb.name} />
                                ) : (
                                    breadcrumb.name
                                )}
                            </span>
                        ) : (
                            <Link
                                href={breadcrumb.url}
                                className="text-teal-800 hover:underline inline-flex"
                            >
                                {index >= 1 ? (
                                    <TruncateText text={breadcrumb.name} />
                                ) : (
                                    breadcrumb.name
                                )}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    )
}
