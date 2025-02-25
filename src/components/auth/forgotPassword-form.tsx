import React, { FormEvent } from 'react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

interface ForgotPasswordFormProps {
    submitForm: (event: FormEvent<HTMLFormElement>) => void
    email: string
    setEmail: (email: string) => void
}

export function ForgotPasswordForm({
    submitForm,
    email,
    setEmail,
}: ForgotPasswordFormProps) {
    return (
        <form onSubmit={submitForm}>
            {/* Email Address */}
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    placeholder="john-doe@example.com"
                    onChange={event => setEmail(event.target.value)}
                    required
                    autoFocus
                />
            </div>

            <div className="flex items-center justify-end mt-4">
                <Button type="submit">Email Password Reset Link</Button>
            </div>
        </form>
    )
}
