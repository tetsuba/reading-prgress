import { createSlice } from '@reduxjs/toolkit'
import { ActionAddStudentTypes, StateStudentTypes } from '../store.types'

export const initialState: StateStudentTypes[] | [] = []

export const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        addStudents: (state, action: ActionAddStudentTypes) => {
            return action.payload
        }
    }
})

export const { addStudents } = studentsSlice.actions

export default studentsSlice.reducer
