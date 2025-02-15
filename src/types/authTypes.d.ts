export type LoginForm = {
    readonly email: string
    readonly password: string
}

export type RegisterForm = LoginForm & {
    readonly name: string
    readonly confirmPassword: string
}

export type AuthErrors = {
    name?: string[]
    email?: string[]
    password?: string[]
    password_confirmation?: string[]
}
