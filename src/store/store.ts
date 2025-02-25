import { configureStore } from '@reduxjs/toolkit'
import dashboardTabReducer from './slices/dashboardTabSlice'
import appStateReducer from './slices/appStateSlice'
import authReducer from './slices/authSlice'
import activeTabReducer from './slices/activeTabSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        activeTab: activeTabReducer,
        appState: appStateReducer,
        dashboardTab: dashboardTabReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
