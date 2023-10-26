import { createSlice } from '@reduxjs/toolkit'
import { ActionTypes, StateCurrentTypes } from '../store.types'

export const initialState = {
    collectionId: null,
    bookId: null,
    studentId: null
} as StateCurrentTypes

interface UpdateCurrentStudentIdActionTypes extends ActionTypes {
    payload: number | null
}
interface UpdateCurrentCollectionIdActionTypes extends ActionTypes {
    payload: string | null
}
interface UpdateCurrentBookIdActionTypes extends ActionTypes {
    payload: number | null
}

export const currentSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        updateCurrentStudentId: (
            state,
            action: UpdateCurrentStudentIdActionTypes
        ) => {
            state.studentId = action.payload
        },
        updateCurrentCollectionId: (
            state,
            action: UpdateCurrentCollectionIdActionTypes
        ) => {
            state.collectionId = action.payload
        },
        updateCurrentBookId: (
            state,
            action: UpdateCurrentBookIdActionTypes
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
