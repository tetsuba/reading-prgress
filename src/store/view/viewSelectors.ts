import { createSelector } from '@reduxjs/toolkit'
import { StateTypes, StateViewTypes } from '../store-types'

const stateView = (state: StateTypes) => state.view

export const viewBooksSelector = createSelector(
    stateView,
    (view: StateViewTypes) => view.books
)
export const viewGlobalExpiredSelector = createSelector(
    stateView,
    (view: StateViewTypes) => view.global.expired
)
