import { createSelector } from '@reduxjs/toolkit'
import { StateUserTypes, StateTypes } from '../store-types'

export const studentsSelector = (state: StateTypes) => state.students

// export const studentsSelector = createSelector(
//     userSelector,
//     (user: StateUserTypes) => user.id
// )
