import { createSlice } from '@reduxjs/toolkit'
import { ActionTypes, StateStudentTypes } from '../store-types'

interface AddStudentActionTypes extends ActionTypes {
    payload: StateStudentTypes
}

export const initialState = null as StateStudentTypes | null

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        addStudent: (state, action: AddStudentActionTypes) => {
            return action.payload
        }
    }
})

export const { addStudent } = studentSlice.actions

export default studentSlice.reducer
