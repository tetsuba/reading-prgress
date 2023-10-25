import { createSlice } from '@reduxjs/toolkit'
import { ActionTypes, StateViewTypes } from '../store.types'

export const initialState = {
    global: {
        expired: false
    },
    books: {
        showMessage: false
    }
} as StateViewTypes

export const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        toggleViewGlobalExpired: (
            state,
            action: ActionTypes & { payload: boolean }
        ) => {
            state.global.expired = action.payload
        },
        toggleBooksShowMessage: (state) => {
            state.books.showMessage = !state.books.showMessage
        }
    }
})

export const { toggleViewGlobalExpired, toggleBooksShowMessage } =
    viewSlice.actions

export default viewSlice.reducer
