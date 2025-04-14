import { configureStore } from '@reduxjs/toolkit'
import appStateReducer from './slices/appStateSlice'
import authReducer from './slices/authSlice'
import formDispatcherReducer from './slices/formDispatcherSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        appState: appStateReducer,
        formDispatched: formDispatcherReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
