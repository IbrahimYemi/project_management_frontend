import { FormDispatchedTypes } from '@/types/generic'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type FormDispatcherProps = {
    formDispatcher: FormDispatchedTypes
}

const initialState: FormDispatcherProps = {
    formDispatcher: null,
}

export const formDispatcherSlice = createSlice({
    name: 'formDispatcher',
    initialState,
    reducers: {
        setFormDispatcher: (
            state,
            action: PayloadAction<FormDispatchedTypes>,
        ) => {
            state.formDispatcher = action.payload
        },
        cancelFormDispatcher: state => {
            state.formDispatcher = null
        },
    },
})

export const { setFormDispatcher, cancelFormDispatcher } =
    formDispatcherSlice.actions

export default formDispatcherSlice.reducer
