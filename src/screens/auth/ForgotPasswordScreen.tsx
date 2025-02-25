'use client'

import { FormEvent, useState } from 'react'
import AuthSessionStatus from '@/components/auth/AuthSessionStatus'
import { ForgotPasswordForm } from '@/components/auth/forgotPassword-form'
import { Card, CardContent } from '@/components/ui/card'

export const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('')

    const submitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // forgotPassword({ email, setErrors, setStatus })
        console.log(email)
    }

    return (
        <Card>
            <CardContent>
                <div className="mb-4 text-sm text-gray-600 mt-4">
                    Forgot your password? No problem. Just let us know your
                    email address and we will email you a password reset token
                    that will allow you to reset a new one.
                </div>
                {/* Session Status */}
                <AuthSessionStatus className="mb-4" authStatus={status} />
                <ForgotPasswordForm
                    submitForm={submitForm}
                    email={email}
                    setEmail={setEmail}
                />
            </CardContent>
        </Card>
    )
}
