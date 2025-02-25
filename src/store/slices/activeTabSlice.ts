import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ActiveTabState = {
    activeTab: string
}

const initialState: ActiveTabState = {
    activeTab: 'dashboard',
}

export const activeTabSlice = createSlice({
    name: 'activeTab',
    initialState,
    reducers: {
        setActiveTab: (state, action: PayloadAction<string>) => {
            state.activeTab = action.payload
        },
    },
})

export const { setActiveTab } = activeTabSlice.actions

export default activeTabSlice.reducer
