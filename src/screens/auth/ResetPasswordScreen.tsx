'use client'

import { FormEvent, useState } from 'react'
import AuthSessionStatus from '@/components/auth/AuthSessionStatus'
import { ResetPasswordForm } from '@/components/auth/resetPassword-form'
import { Card, CardContent } from '@/components/ui/card'

export const ResetPasswordScreen = () => {
    const [email, setEmail] = useState<string>('')
    const [token, setToken] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

    const submitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        console.log({
            token,
            email,
            password,
            password_confirmation: passwordConfirmation,
        })
    }

    return (
        <Card>
            <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">
                    Reset Your Password
                </h2>

                <AuthSessionStatus className="mb-4" authStatus={status} />

                <ResetPasswordForm
                    submitForm={submitForm}
                    token={token}
                    setToken={setToken}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    passwordConfirmation={passwordConfirmation}
                    setPasswordConfirmation={setPasswordConfirmation}
                />
            </CardContent>
        </Card>
    )
}
