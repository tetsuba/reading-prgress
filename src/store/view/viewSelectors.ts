import { createSelector } from '@reduxjs/toolkit'
import {
    StateTypes,
    StateViewGlobalTypes,
    StateViewTypes
} from '../store-types'

const stateView = (state: StateTypes) => state.view

export const viewBooksSelector = createSelector(
    stateView,
    (view: StateViewTypes) => view.books
)
export const viewGlobalSelector = createSelector(
    stateView,
    (view: StateViewTypes) => view.global
)
export const viewGlobalExpiredSelector = createSelector(
    viewGlobalSelector,
    (global: StateViewGlobalTypes) => global.expired
)
