import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { tabs } from '../RoughData'

type DashboardTabProps = {
    dashboardTab: string
}

const initialState: DashboardTabProps = {
    dashboardTab: tabs[0],
}

export const dashboardTabSlice = createSlice({
    name: 'dashboardTab',
    initialState,
    reducers: {
        setDashboardTab: (
            state,
            action: PayloadAction<DashboardTabProps['dashboardTab']>,
        ) => {
            state.dashboardTab = action.payload
        },
    },
})

export const { setDashboardTab } = dashboardTabSlice.actions

export default dashboardTabSlice.reducer
