import { configureStore } from '@reduxjs/toolkit'
import authTabReducer from './features/authTabSlice'

export const store = configureStore({
    reducer: {
        authTab: authTabReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
