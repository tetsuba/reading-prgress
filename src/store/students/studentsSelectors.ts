import { createSelector } from '@reduxjs/toolkit'
import { StateTypes } from '../store-types'
import { viewStudentIdSelector } from '../view/viewSelectors'

export const studentsSelector = (state: StateTypes) => state.students

export const studentSelector = createSelector(
    [studentsSelector, viewStudentIdSelector],
    (students, studentId) =>
        students.find((student) => student.studentId === studentId)
)
