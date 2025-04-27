import {
    Briefcase,
    Settings,
    Users2,
    UserSquare,
    Home,
    ListChecks,
    CalendarDays,
} from 'lucide-react'

export const links = [
    { label: 'dashboard', href: '/dashboard', Icon: Home },
    { label: 'users', href: '/users', Icon: UserSquare },
    { label: 'projects', href: '/projects', Icon: Briefcase },
    { label: 'teams', href: '/teams', Icon: Users2 },
    { label: 'tasks', href: '/tasks', Icon: ListChecks },
    { label: 'calendar', href: '/calendar', Icon: CalendarDays },
    { label: 'settings', href: '/settings', Icon: Settings },
]

export const priorityColors: Record<string, string> = {
    low: 'green',
    normal: 'blue',
    medium: 'yellow',
    high: 'orange',
    urgent: 'red',
    daily: 'purple',
    default: 'gray',
}
