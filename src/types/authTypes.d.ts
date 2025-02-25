export type email = {
    email: string
}

// User Types
export type User = email & {
    id: string
    name: string
    avatar: string
    role: string
    isActive?: boolean
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

export type ResetPasswordParams = email & {
    token: string
    password: string
    password_confirmation: string
}

// Validation Errors Type (from API)
export type AuthErrors = Partial<{
    name: string[]
    email: string[]
    password: string[]
    password_confirmation: string[]
    login_token: string[]
}>
