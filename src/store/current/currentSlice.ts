import { createSlice } from '@reduxjs/toolkit'
import {
    ActionUpdateCurrentBookIdTypes,
    ActionUpdateCurrentCollectionIdTypes,
    ActionUpdateCurrentStudentIdTypes,
    StateCurrentTypes
} from '../store.types'

export const initialState = {
    collectionId: null,
    bookId: null,
    studentId: null
} as StateCurrentTypes

export const currentSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        updateCurrentStudentId: (
            state,
            action: ActionUpdateCurrentStudentIdTypes
        ) => {
            state.studentId = action.payload
        },
        updateCurrentCollectionId: (
            state,
            action: ActionUpdateCurrentCollectionIdTypes
        ) => {
            state.collectionId = action.payload
        },
        updateCurrentBookId: (
            state,
            action: ActionUpdateCurrentBookIdTypes
        ) => {
            state.bookId = action.payload
        },
        resetCurrentToInitialState: () => initialState
    }
})

export const {
    updateCurrentStudentId,
    updateCurrentCollectionId,
    updateCurrentBookId,
    resetCurrentToInitialState
} = currentSlice.actions

export default currentSlice.reducer
