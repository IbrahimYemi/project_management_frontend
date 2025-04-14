import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AppStateProps = {
    appState: 'isLoading' | 'isError' | 'isSuccess' | 'isIdle' | 'isRequesting'
}

const initialState: AppStateProps = {
    appState: 'isIdle',
}

export const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        setAppState: (
            state,
            action: PayloadAction<AppStateProps['appState']>,
        ) => {
            state.appState = action.payload
        },
    },
})

export const { setAppState } = appStateSlice.actions

export default appStateSlice.reducer
