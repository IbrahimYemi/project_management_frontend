import { cn } from '@/lib/utils'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormEvent, useState } from 'react'
import InputError from '../ui/InputError'
import {
    AuthErrors,
    LoginPasswordParams,
    LoginTokenParams,
} from '@/types/authTypes'
import Link from 'next/link'
import { validateEmail } from '@/lib/fn/emailValidator'
import { Loader } from 'lucide-react'
import { useRequestLoginToken } from '@/hooks/auth/useRequestLoginToken'
import { useLoginPassword, useLoginToken } from '@/hooks/auth/authHooks'
import { RequestTokenButton } from './RequestTokenButton'

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'div'>) {
    const { request, isTokenLoading } = useRequestLoginToken()
    const { loginWithPassword, isPending: isPasswordLoginLoading } =
        useLoginPassword()
    const { loginWithToken, isPending: isTokenLoginLoading } = useLoginToken()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginToken, setLoginToken] = useState('')
    const [errors] = useState<AuthErrors>({})
    const [authMethod, setAuthMethod] = useState<'password' | 'token' | null>(
        null,
    )
    const [emailValid, setEmailValid] = useState(false)

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = event.target.value
        setEmail(emailValue)

        // Check if the email is valid and update state
        setEmailValid(validateEmail(emailValue))
    }

    const handleLoginMethod = (method: 'password' | 'token') => {
        setAuthMethod(method)

        // Reset the other method's input field based on the selected method
        if (method === 'password') {
            setLoginToken('')
        } else {
            setPassword('')
        }
    }

    function handleLoginPassword(values: LoginPasswordParams) {
        loginWithPassword(values)
    }

    function handleLoginToken(values: LoginTokenParams) {
        loginWithToken(values)
    }

    function handleRequestToken(email: string) {
        request({ email })
    }

    const submitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (authMethod === 'password') {
            handleLoginPassword({
                email,
                password,
            })
        } else {
            handleLoginToken({
                email,
                login_token: loginToken,
            })
        }
    }

    return (
        <div
            className={cn('flex flex-col gap-6 text-white', className)}
            {...props}
        >
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>Login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submitForm}>
                        <div className="grid gap-6">
                            {/* Email Section */}
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        placeholder="m@example.com"
                                        className="text-white"
                                        onChange={handleEmailChange}
                                        required
                                        autoFocus
                                    />

                                    <InputError
                                        messages={errors?.email}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Conditionally Render Inputs Based on Auth Method */}
                                {emailValid && email.length > 0 && (
                                    <>
                                        {authMethod === 'password' && (
                                            <div className="grid gap-2">
                                                <div className="flex items-center">
                                                    <Label htmlFor="password">
                                                        Password
                                                    </Label>
                                                    <Link
                                                        href="/auth/forgot-password"
                                                        className="ml-auto text-sm underline-offset-4 hover:underline"
                                                    >
                                                        Forgot your password?
                                                    </Link>
                                                </div>

                                                <Input
                                                    id="password"
                                                    type="password"
                                                    value={password}
                                                    placeholder="********"
                                                    onChange={e =>
                                                        setPassword(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="text-white"
                                                    required
                                                    autoComplete="new-password"
                                                />

                                                <InputError
                                                    messages={errors?.password}
                                                    className="mt-2"
                                                />
                                            </div>
                                        )}

                                        {authMethod === 'token' && (
                                            <div className="grid gap-2">
                                                <div className="flex items-center">
                                                    <Label htmlFor="login_token">
                                                        Login Token
                                                    </Label>
                                                </div>

                                                <Input
                                                    id="login_token"
                                                    type="text"
                                                    value={loginToken}
                                                    placeholder="12CFDE44"
                                                    onChange={e =>
                                                        setLoginToken(
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                    className="text-white"
                                                />

                                                <InputError
                                                    messages={
                                                        errors?.login_token
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* Show Submit Button Only When Either Password or Token is Provided */}
                                {(password.length > 4 ||
                                    loginToken.length > 4) && (
                                    <Button
                                        type="submit"
                                        className="w-full text-center"
                                    >
                                        {isPasswordLoginLoading ||
                                        isTokenLoginLoading ? (
                                            <Loader className="animate-spin" />
                                        ) : (
                                            'Login'
                                        )}
                                    </Button>
                                )}

                                {/* Auth Method Toggle */}
                                {emailValid && email.length > 0 && (
                                    <div className="flex items-center justify-between -mt-5">
                                        <RequestTokenButton
                                            email={email}
                                            authMethod={authMethod}
                                            onRequest={handleRequestToken}
                                            isLoading={isTokenLoading}
                                        />
                                        <div className="relative w-full flex justify-end">
                                            {!isTokenLoading && (
                                                <button
                                                    type="button"
                                                    className="bg-none text-xs self-end p-2 outline-none focus:outline-none"
                                                    onClick={() =>
                                                        handleLoginMethod(
                                                            authMethod ===
                                                                'password'
                                                                ? 'token'
                                                                : 'password',
                                                        )
                                                    }
                                                >
                                                    {authMethod === 'password'
                                                        ? 'login with token'
                                                        : 'login with password'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sign Up Option */}
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{' '}
                                <Link
                                    href="/auth/register"
                                    className="underline underline-offset-4"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                By clicking login, you agree to our{' '}
                <a href="#">Terms of Service</a> and{' '}
                <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}
