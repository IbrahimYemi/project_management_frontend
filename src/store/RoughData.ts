import { User } from '@/types/authTypes'
import { DashboardData } from '@/types/dashboard'
import {
    Briefcase,
    Settings,
    Users2,
    UserSquare,
    Home,
    ListChecks,
    CalendarDays,
} from 'lucide-react'
export const tabs: string[] = ['overview', 'board', 'files', 'members']

export const tasks = [
    'Alice',
    'Bob',
    'Charlie',
    'Bob',
    'Charlie',
    'Bob',
    'Charlie',
    'Bob',
    'Charlie',
    'Bob',
    'Charlie',
]

export const links = [
    { label: 'dashboard', href: '/dashboard', Icon: Home },
    { label: 'users', href: '/users', Icon: UserSquare },
    { label: 'projects', href: '/projects', Icon: Briefcase },
    { label: 'teams', href: '/teams', Icon: Users2 },
    { label: 'tasks', href: '/projects/tasks', Icon: ListChecks },
    { label: 'calender', href: '/calender', Icon: CalendarDays },
    { label: 'settings', href: '/settings', Icon: Settings },
]

export const mockDashboardData: DashboardData = {
    projects: [
        { name: 'Completed', value: 45 },
        { name: 'In Progress', value: 25 },
        { name: 'In Review', value: 20 },
        { name: 'Not Started', value: 10 },
    ],
    allProjectsData: [
        { name: 'E-commerce Platform', statusName: 'In Progress', value: 60 },
        { name: 'Mobile App', statusName: 'Delayed', value: 30 },
        { name: 'HR Management System', statusName: 'Completed', value: 85 },
        { name: 'Landing Page', statusName: 'Live', value: 100 },
    ],
    tasks: [
        { name: 'Design', value: 80, owner: 'owner user 1' },
        { name: 'Development', value: 50, owner: 'owner user 2' },
        { name: 'Testing', value: 30, owner: 'owner user 3' },
        { name: 'Deployment', value: 10, owner: 'owner user 4' },
        { name: 'Research', value: 60, owner: 'owner user 5' },
        { name: 'Planning', value: 90, owner: 'owner user 6' },
        { name: 'UI/UX', value: 40, owner: 'owner user 7' },
        { name: 'API Integration', value: 70, owner: 'owner user 8' },
        { name: 'Code Review', value: 20, owner: 'owner user 9' },
        { name: 'Bug Fixing', value: 85, owner: 'owner user 10' },
        { name: 'Security Audit', value: 35, owner: 'owner user 11' },
        { name: 'Final Testing', value: 95, owner: 'owner user 12' },
    ],
    meetings: [
        { agenda: 'Project Kickoff', date: '2025-02-22', time: '10:00 AM' },
        { agenda: 'Sprint Planning', date: '2025-02-23', time: '02:00 PM' },
        { agenda: 'Client Review', date: '2025-02-24', time: '04:30 PM' },
    ],
    teams: [
        {
            name: 'Frontend Team',
            teamLead: 'Alice Johnson',
            members: 5,
            projectCount: 15,
        },
        {
            name: 'Backend Team',
            teamLead: 'Morris Kent',
            members: 5,
            projectCount: 15,
        },
        {
            name: 'QA Team',
            teamLead: 'Alabi Johnson',
            members: 5,
            projectCount: 15,
        },
    ],
}

export const allUsersData: User[] = Array.from({ length: 30 }, (_, i) => ({
    id: `${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
    role: 'Member',
}))
