import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useRegister } from '@/hooks/auth/authHooks'

export function RegisterForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'div'>) {
    const params = new URLSearchParams(window.location.search)
    const urlToken = params.get('token') as string
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [emailToken, setToken] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const { mutate: register, isPending: isLoading } = useRegister()

    useEffect(() => {
        if (typeof urlToken === 'string') {
            setToken(urlToken)
        }
    }, [urlToken])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const values = {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            email_token: emailToken,
        }
        if (values.password !== values.password_confirmation) {
            return toast.info('Passwords do not match')
        }
        register(values)
    }

    return (
        <>
            <div className={cn('flex flex-col gap-6', className)} {...props}>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Hello There</CardTitle>
                        <CardDescription>
                            Get started with your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-6">
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Name */}
                                    <div className="grid gap-2 col-span-2">
                                        <Label htmlFor="name">Name</Label>

                                        <Input
                                            id="name"
                                            type="text"
                                            value={name}
                                            placeholder="Jane Doe"
                                            onChange={event =>
                                                setName(event.target.value)
                                            }
                                            required
                                            autoFocus
                                            className="text-white"
                                        />
                                    </div>

                                    {/* Email Address */}
                                    <div className="grid gap-2 col-span-2">
                                        <Label htmlFor="email">Email</Label>

                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            placeholder="m@example.com"
                                            onChange={event =>
                                                setEmail(event.target.value)
                                            }
                                            required
                                            className="text-white"
                                        />
                                    </div>

                                    {/* Token */}
                                    <div className="grid gap-2 col-span-2">
                                        <Label htmlFor="token">
                                            Email Token
                                        </Label>

                                        <Input
                                            id="token"
                                            type="text"
                                            value={emailToken}
                                            placeholder="092743"
                                            onChange={event =>
                                                setToken(event.target.value)
                                            }
                                            required
                                            className="text-white"
                                        />
                                    </div>

                                    {/* Password */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>

                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            placeholder="********"
                                            className="text-white"
                                            onChange={event =>
                                                setPassword(event.target.value)
                                            }
                                            required
                                            autoComplete="new-password"
                                        />
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="passwordConfirmation">
                                            Confirm Password
                                        </Label>

                                        <Input
                                            id="passwordConfirmation"
                                            type="password"
                                            placeholder="********"
                                            className="text-white"
                                            value={passwordConfirmation}
                                            onChange={event =>
                                                setPasswordConfirmation(
                                                    event.target.value,
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full col-span-2"
                                    >
                                        {isLoading
                                            ? 'Registering...'
                                            : 'Register'}
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Already registered?{' '}
                                    <Link
                                        href="/auth/login"
                                        className="underline underline-offset-4"
                                    >
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                    By clicking continue, you agree to our{' '}
                    <a href="#">Terms of Service</a> and{' '}
                    <a href="#">Privacy Policy</a>.
                </div>
            </div>
        </>
    )
}
