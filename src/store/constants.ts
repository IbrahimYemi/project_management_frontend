// Local Storage Keys
export const STORAGE_KEYS = {
    AUTH_TOKEN: 'app_x_1', // authToken
    AUTH_USER: '_xapp_2_session', // user
    SESSION_DURATION: '_xclock_app_3', // loginAt
    INVITE_SEARCH_INPUT: 'inviteSearchText',
    USERS_SEARCH_INPUT: 'usersSearchText',
    PROJECTS_SEARCH_INPUT: 'projectsSearchText',
    CALENDAR_SEARCH_INPUT: 'calendarSearchText',
    ACTIVE_PATH_ID: 'activePathId',
    RESOURCE_TO_EDIT: 'resourceToEdit',
} as const

// React Query Keys
export const QUERY_KEYS = {
    AUTH_USER: 'authUser',
    DASHBOARD: 'dashboard',
    USERS: {
        ALL: 'allUsers',
        GENERAL: 'allUnpaginatedUsers',
        INVITED: 'invitedUsers',
        SINGLE: 'singleUser',
    },
    PROJECTS: {
        ALL: 'allProjects',
        SINGLE: 'singleProject',
        STATUS: 'projectStatus',
    },
    TEAMS: {
        ALL: 'allTeams',
        SINGLE: 'singleTeam',
    },
    SCHEDULES: 'allSchedules',
    TASKS: {
        ALL: 'allTasks',
        SINGLE: 'singleTask',
    },
    NOTES: 'allNotes',
    NOTIFICATIONS: 'notifications',
} as const
