import { createSlice } from '@reduxjs/toolkit'
import { ActionTypes, StateStudentTypes } from '../store-types'

interface AddStudentActionTypes extends ActionTypes {
    payload: StateStudentTypes[]
}

export const initialState = [] as StateStudentTypes[] | []

export const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        addStudents: (state, action: AddStudentActionTypes) => {
            return action.payload
        }
    }
})

export const { addStudents } = studentsSlice.actions

export default studentsSlice.reducer
