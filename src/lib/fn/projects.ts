import {
    ApiProjectDetailsResponse,
    ApiProjectsResponse,
    ProjectDetails,
    Projects,
    ProjectStatusType,
    ApiProjectStatusesResponse,
    CreateProjectParams,
    ApiUserProjectResponse,
} from '@/types/projects'
import apiClient from '../axios'
import { User } from '@/types/authTypes'
import { DiscussionType, TaskType } from '@/types/tasks'
import { Team } from '@/types/teams'
import { ApiNoResponse } from '@/types/generic'

export const fetchProjectsData = async (
    page = 1,
    perPage = 20,
    query = '',
): Promise<ApiProjectsResponse> => {
    let url = `/api/projects?page=${page}&per_page=${perPage}`
    url = query ? `${url}&query=${query}` : url
    const response = await apiClient.get<ApiProjectsResponse>(url)
    return response.data
}

export const fetchProjectById = async (
    projectId: string,
): Promise<ProjectDetails> => {
    if (!projectId) throw new Error('Project ID is required')

    const response = await apiClient.get<ApiProjectDetailsResponse>(
        `/api/projects/${projectId}`,
    )
    return response.data.data
}

export const fetchProjectStatuses = async (): Promise<ProjectStatusType[]> => {
    const response = await apiClient.get<ApiProjectStatusesResponse>(
        '/api/projects-statuses',
    )
    return response.data.data
}

export const fetchUserProjects = async (
    userId: string,
): Promise<Projects[]> => {
    const response = await apiClient.get<ApiUserProjectResponse>(
        `/api/get-user-projects/${userId}`,
    )
    return response.data.data
}

export const createProject = async (params: CreateProjectParams) => {
    const response = await apiClient.post<ApiNoResponse>(
        '/api/projects',
        params,
    )
    return response.data
}

export const editProject = async (params: CreateProjectParams, id: string) => {
    const response = await apiClient.put<ApiNoResponse>(
        `/api/projects/${id}`,
        params,
    )
    return response.data
}

export const deleteProject = async (id: string) => {
    const response = await apiClient.delete<ApiNoResponse>(
        '/api/projects' + `/${id}`,
    )
    return response.data
}

export const markProjectComplete = async (id: string) => {
    const response = await apiClient.post<ApiNoResponse>(
        '/api/projects' + `/${id}/mark-as-completed`,
    )
    return response.data
}

export const updateTaskStatusAPI = async (
    taskId: string,
    newStatusId: number,
) => {
    try {
        // await apiClient.put(`/api/tasks/, { statusId: newStatusId })
        console.log({ statusId: newStatusId }, `Task status updated: ${taskId}`)
    } catch (error) {
        console.error('Failed to update task status:', error)
    }
}

export const longText =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id recusandae inventore, impedit molestiae dicta rem voluptatem quidem animi cum culpa magnam? Suscipit cumque quam ab, enim, sunt sed magnam blanditiis quasi assumenda, placeat voluptas aspernatur accusantium ad voluptatibus? Atque temporibus voluptatibus voluptatum ipsam iste consequatur reprehenderit corporis cupiditate odit doloribus eos dolores ratione optio recusandae ad quasi quisquam sit voluptates, necessitatibus nulla fugit quis officia tempora id? Necessitatibus nulla temporibus deserunt reprehenderit asperiores nesciunt soluta inventore? At animi tenetur porro soluta molestias odio sapiente? Consectetur sunt deserunt ratione tenetur iusto nam alias, suscipit quia, reiciendis fuga quod doloremque laudantium repellendus quam distinctio obcaecati sapiente voluptas voluptatem harum natus aut nulla vero eveniet accusantium! Necessitatibus explicabo unde autem delectus rem blanditiis voluptas ullam consequuntur, assumenda sapiente quas omnis reprehenderit reiciendis illo incidunt maiores eveniet molestias odio doloribus neque? Doloremque quasi dolores non officiis eaque? Inventore non accusantium animi quis voluptates tenetur. Quisquam, quidem. Quisquam, quidem.'

export const projectTaskStatus = [
    {
        id: 1,
        name: 'Not started',
        percentage: 0,
    },
    {
        id: 2,
        name: 'In Progress',
        percentage: 40,
    },
    {
        id: 3,
        name: 'Completed',
        percentage: 90,
    },
    {
        id: 4,
        name: 'On Hold',
        percentage: 50,
    },
    {
        id: 5,
        name: 'Cancelled',
        percentage: 50,
    },
    {
        id: 6,
        name: 'Approved',
        percentage: 100,
    },
]

export const mockProjects: Projects[] = [
    {
        id: '1',
        name: 'Website Redesign',
        description:
            longText + 'Revamping the company website with a modern UI/UX.',
        task_count: 12,
        members_count: 5,
        team_name: 'Frontend Team',
        percentage: 75,
        is_completed: false,
        created_at: '2025-02-10T14:00:00Z',
        task_status: projectTaskStatus,
    },
    {
        id: '2',
        name: 'Mobile App Development',
        description:
            longText + 'Building a cross-platform mobile app for e-commerce.',
        task_count: 20,
        members_count: 8,
        team_name: 'Mobile Team',
        percentage: 40,
        is_completed: false,
        created_at: '2025-01-20T10:30:00Z',
        task_status: projectTaskStatus,
    },
    {
        id: '3',
        name: 'Backend API Optimization',
        description:
            longText + 'Improving database queries and API performance.',
        task_count: 15,
        members_count: 4,
        team_name: 'Backend Team',
        percentage: 90,
        is_completed: false,
        created_at: '2025-03-01T08:45:00Z',
        task_status: projectTaskStatus,
    },
    {
        id: '4',
        name: 'Marketing Automation',
        description:
            longText + 'Automating marketing emails and customer outreach.',
        task_count: 10,
        members_count: 3,
        team_name: 'Marketing Team',
        percentage: 100,
        is_completed: true,
        created_at: '2024-12-15T16:20:00Z',
        task_status: projectTaskStatus,
    },
]

export const mockTeams: Team[] = [
    {
        id: '1',
        name: 'Frontend Team',
        teamLead: 'John Doe',
        members: 3,
        projectCount: 1,
    },
    {
        id: '2',
        name: 'Mobile Team',
        teamLead: 'Jane Smith',
        members: 5,
        projectCount: 1,
    },
]

export const mockUsers: User[] = [
    {
        id: '101',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        role: 'Frontend Developer',
        isActive: true,
    },
    {
        id: '102',
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        role: 'Mobile Developer',
        isActive: true,
    },
    {
        id: '103',
        name: 'Mark Wilson',
        email: 'mark@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        role: 'UI/UX Designer',
        isActive: true,
    },
]

export const mockDiscussions: DiscussionType[] = [
    {
        id: 'D1',
        message:
            'This homepage design looks great, but we should add more contrast.',
        user: mockUsers[1],
        created_at: '2025-03-02',
        updated_at: '2025-03-02',
    },
    {
        id: 'D2',
        message:
            'Agreed! Also, let’s consider making the hero section more interactive.',
        user: mockUsers[2],
        created_at: '2025-03-03',
        updated_at: '2025-03-03',
    },
    {
        id: 'D3',
        message: 'For authentication, should we use JWT or session-based auth?',
        user: mockUsers[0],
        created_at: '2025-03-06',
        updated_at: '2025-03-06',
    },
]

export const mockTasks: TaskType[] = [
    {
        id: 'T1',
        name: 'Design Home Page',
        description:
            longText + ' Create a modern and user-friendly homepage UI.',
        status: projectTaskStatus[2],
        percentage: 20,
        project: mockProjects[0],
        owner: mockUsers[0],
        startDate: '2025-03-01',
        dueDate: '2025-03-10',
        createdDate: '2025-03-01',
        updatedDate: '2025-03-07',
        isCompleted: false,
        priority: 'high',
        taskImage:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfzby4YEEtc7zpKGQcnEtBhNtSEyTYiDZbaQ&s',
        taskDiscussionCount: 234,
        discussions: [mockDiscussions[0], mockDiscussions[1]],
        taskFileCount: 4,
        files: [
            {
                id: 'F1',
                name: 'Wireframe PDF',
                url: 'https://example.com/wireframe.pdf',
                type: 'pdf',
                user: mockUsers[0],
                created_at: '2025-03-01',
                updated_at: '2025-03-07',
            },
            {
                id: 'F2',
                name: 'Design file PSD',
                url: 'https://example.com/design.psd',
                type: 'psd',
                user: mockUsers[1],
                created_at: '2025-03-02',
                updated_at: '2025-03-07',
            },
            {
                id: 'F7',
                name: 'figma-reset Image',
                url: 'https://example.com/fimga-reset.png',
                type: 'image',
                user: mockUsers[2],
                created_at: '2025-03-03',
                updated_at: '2025-03-07',
            },
            {
                id: 'F3',
                name: 'StyleGuide Docx',
                url: 'https://example.com/styleguide.docx',
                type: 'docx',
                user: mockUsers[2],
                created_at: '2025-03-03',
                updated_at: '2025-03-07',
            },
        ],
    },
    {
        id: 'T2',
        name: 'Implement Authentication',
        description: longText + ' Develop login and signup functionality.',
        status: projectTaskStatus[3],
        percentage: 0,
        project: mockProjects[0],
        owner: mockUsers[1],
        startDate: '2025-03-05',
        dueDate: '2025-03-15',
        createdDate: '2025-03-05',
        updatedDate: '2025-03-05',
        isCompleted: false,
        priority: 'urgent',
        taskImage:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfzby4YEEtc7zpKGQcnEtBhNtSEyTYiDZbaQ&s',
        taskDiscussionCount: 1,
        discussions: [mockDiscussions[2]],
        taskFileCount: 2,
        files: [
            {
                id: 'F4',
                name: 'API Docs.pdf',
                url: 'https://example.com/api-docs.pdf',
                type: 'pdf',
                user: mockUsers[1],
                created_at: '2025-03-05',
                updated_at: '2025-03-05',
            },
            {
                id: 'F5',
                name: 'JWT Guide.txt',
                url: 'https://example.com/jwt-guide.txt',
                type: 'txt',
                user: mockUsers[0],
                created_at: '2025-03-06',
                updated_at: '2025-03-06',
            },
        ],
    },
]

export const mockApiProjectDetailResponse: SampleData = {
    data: {
        success: true,
        message: 'Project details fetched successfully',
        data: {
            project: mockProjects[0],
            team: mockTeams[0],
            members: mockUsers,
            tasks: mockTasks,
        },
    },
}

type SampleData = {
    data: ApiProjectDetailsResponse
}
