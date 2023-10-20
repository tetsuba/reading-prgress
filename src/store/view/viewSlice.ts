import { createSlice } from '@reduxjs/toolkit'
import { ActionTypes, StateViewTypes } from '../store.types'
import { ApiCollectionTypes } from '../../api/api-types'

export const initialState = {
    global: {
        expired: false
    }
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
        toggleViewGlobalExpired: (
            state,
            action: ActionTypes & { payload: boolean }
        ) => {
            state.global.expired = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { toggleViewGlobalExpired } = viewSlice.actions

export default viewSlice.reducer
