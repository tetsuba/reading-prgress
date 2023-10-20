import { createSelector } from '@reduxjs/toolkit'
import { StateTypes } from '../store.types'

const stateView = (state: StateTypes) => state.current

export const currentStudentIdSelector = createSelector(
    stateView,
    (current) => current.studentId
)

export const currentCollectionIdSelector = createSelector(
    stateView,
    (current) => current.collectionId
)

export const currentBookIdSelector = createSelector(
    stateView,
    (current) => current.bookId
)
