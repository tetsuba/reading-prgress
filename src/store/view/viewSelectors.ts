import { createSelector } from '@reduxjs/toolkit'
import { StateTypes, StateViewTypes } from '../store-types'

const stateView = (state: StateTypes) => state.view

export const viewBooksCollectionSelector = createSelector(
    stateView,
    (view: StateViewTypes) => view.books.collection
)
export const viewGlobalExpiredSelector = createSelector(
    stateView,
    (view: StateViewTypes) => view.global.expired
)

export const viewStudentIdSelector = createSelector(
    stateView,
    (view) => view.studentId
)
