import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, User } from '@/types/authTypes'

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        removeUser: state => {
            state.user = null
            state.isAuthenticated = false
        },
    },
})

export const { setUser, removeUser } = authSlice.actions
export default authSlice.reducer
