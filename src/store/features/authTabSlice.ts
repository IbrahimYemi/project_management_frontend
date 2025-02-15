import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthTabState {
    activeTab: 'login' | 'register'
}

const initialState: AuthTabState = {
    activeTab: 'login',
}

export const authTabSlice = createSlice({
    name: 'authTab',
    initialState,
    reducers: {
        setActiveTab: (state, action: PayloadAction<'login' | 'register'>) => {
            state.activeTab = action.payload
        },
    },
})

export const { setActiveTab } = authTabSlice.actions

export default authTabSlice.reducer
