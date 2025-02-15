import React, { FormEvent } from 'react'
import InputError from '../ui/InputError'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

interface ResetPasswordFormProps {
    submitForm: (event: FormEvent<HTMLFormElement>) => void
    token: string
    setToken: (token: string) => void
    email: string
    setEmail: (email: string) => void
    password: string
    setPassword: (password: string) => void
    passwordConfirmation: string
    setPasswordConfirmation: (passwordConfirmation: string) => void
    errors: {
        token?: string[]
        email?: string[]
        password?: string[]
        passwordConfirmation?: string[]
    }
}

export function ResetPasswordForm({
    submitForm,
    token,
    setToken,
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    errors,
}: ResetPasswordFormProps) {
    return (
        <form onSubmit={submitForm} className="grid grid-cols-2 gap-3">
            {/* Token */}
            <div className="col-span-2">
                <Label htmlFor="token">Token</Label>
                <Input
                    id="token"
                    type="text"
                    name="token"
                    value={token}
                    placeholder="Enter token"
                    className="w-full"
                    onChange={event => setToken(event.target.value)}
                    required
                />
                <InputError messages={errors.token ?? []} className="mt-2" />
            </div>

            {/* Email Address */}
            <div className="col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    placeholder="john-doe@example.com"
                    className="w-full"
                    onChange={event => setEmail(event.target.value)}
                    required
                />
                <InputError messages={errors.email ?? []} className="mt-2" />
            </div>

            {/* Password */}
            <div>
                <Label htmlFor="password">New Password</Label>
                <Input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Enter new password"
                    className="w-full"
                    onChange={event => setPassword(event.target.value)}
                    required
                />
                <InputError messages={errors.password ?? []} className="mt-2" />
            </div>

            {/* Password Confirmation */}
            <div>
                <Label htmlFor="passwordConfirmation">Confirm Password</Label>
                <Input
                    id="passwordConfirmation"
                    type="password"
                    name="passwordConfirmation"
                    value={passwordConfirmation}
                    placeholder="Confirm new password"
                    className="w-full"
                    onChange={event =>
                        setPasswordConfirmation(event.target.value)
                    }
                    required
                />
                <InputError
                    messages={errors.passwordConfirmation ?? []}
                    className="mt-2"
                />
            </div>

            <div className="flex items-center justify-end col-span-2">
                <Button type="submit">Reset Password</Button>
            </div>
        </form>
    )
}
