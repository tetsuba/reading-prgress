import { createSlice } from '@reduxjs/toolkit'
import { ActionTypes, StateViewTypes } from '../store-types'
import { ApiCollectionTypes } from '../../lib/service-types'

const initialState = {
    books: {
        collection: null
    },
    global: {
        expired: false
    }
} as StateViewTypes

interface UpdateViewBooksCollectionActionTypes extends ActionTypes {
    payload: ApiCollectionTypes | null
}

export const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        updateViewBookCollection: (
            state,
            action: UpdateViewBooksCollectionActionTypes
        ) => {
            state.books.collection = action.payload
        },
        toggleViewGlobalExpired: (
            state,
            action: ActionTypes & { payload: boolean }
        ) => {
            state.global.expired = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { updateViewBookCollection, toggleViewGlobalExpired } =
    viewSlice.actions

export default viewSlice.reducer
