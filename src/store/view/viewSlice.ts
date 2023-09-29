import { createSlice } from '@reduxjs/toolkit'
import { ActionTypes, StateViewTypes } from '../store-types'
import { ApiCollectionTypes } from '../../api/api-types'

const initialState = {
    books: {
        collection: null
    },
    global: {
        expired: false
    },
    studentId: null
} as StateViewTypes

interface UpdateViewBooksCollectionActionTypes extends ActionTypes {
    payload: ApiCollectionTypes | null
}

interface UpdateViewStudentIdActionTypes extends ActionTypes {
    payload: number | null
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
        },
        updateViewStudentId: (
            state,
            action: UpdateViewStudentIdActionTypes
        ) => {
            state.studentId = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    updateViewStudentId,
    updateViewBookCollection,
    toggleViewGlobalExpired
} = viewSlice.actions

export default viewSlice.reducer
