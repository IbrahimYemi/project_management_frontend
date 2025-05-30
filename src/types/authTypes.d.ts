export type email = {
    email: string
}

export type UserAppRoles = 'Super Admin' | 'Admin' | 'Team Lead' | 'Member'

// User Types
export type User = {
    email: string
    id: string
    name: string
    avatar: string
    role: string
    isActive?: boolean
    app_role?: UserAppRoles
    created_at?: string
    updated_at?: string
}

// Auth State Type
export type AuthState = {
    user: User | null
    isAuthenticated: boolean
}

// Login Types
export type LoginTokenParams = {
    email: string
    login_token: string
}

export type LoginPasswordParams = email & {
    password: string
}

export type LoginRequestParams = LoginTokenParams | LoginPasswordParams

// Registration Types
export type RegisterParams = email & {
    name: string
    password: string
    password_confirmation: string
    email_token: string
}

export type RegisterFormParams = RegisterParams & {
    confirmPassword: string // Optional extra field for client-side validation
}

export type ForgotPasswordParams = email

export type LoginToken = email

export type genericPasswordParams = {
    password: string
    password_confirmation: string
}

export type UpdatePasswordParams = genericPasswordParams & {
    old_password: string
}

export type UpdateAvatarParams = {
    avatar: string
    name: string
}

export type ResetPasswordParams = email &
    genericPasswordParams & {
        token: string
    }

// Validation Errors Type (from API)
export type AuthErrors = Partial<{
    name: string[]
    email: string[]
    password: string[]
    password_confirmation: string[]
    login_token: string[]
}>
