import { loginPasswordUser, loginTokenUser, registerUser } from '@/lib/fn/auth'
import useAuthMutation from './useAuthMutation'
import {
    LoginPasswordParams,
    LoginTokenParams,
    RegisterParams,
} from '@/types/authTypes'

export const useRegister = () => {
    const mutation = useAuthMutation<RegisterParams>(
        registerUser,
        '/dashboard',
        true,
    )
    return { register: mutation.mutate, ...mutation }
}

export const useLoginPassword = () => {
    const mutation = useAuthMutation<LoginPasswordParams>(
        loginPasswordUser,
        '/dashboard',
        true,
    )
    return { loginWithPassword: mutation.mutate, ...mutation }
}

export const useLoginToken = () => {
    const mutation = useAuthMutation<LoginTokenParams>(
        loginTokenUser,
        '/dashboard',
        true,
    )
    return { loginWithToken: mutation.mutate, ...mutation }
}
