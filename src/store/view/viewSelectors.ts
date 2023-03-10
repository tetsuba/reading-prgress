import { createSelector } from '@reduxjs/toolkit'

const stateView = (state: any) => state.view

export const viewBooksSelector = createSelector(stateView, (view) => view.books)
export const viewGlobalSelector = createSelector(stateView, (view) => view.global)
export const viewGlobalExpiredSelector = createSelector(viewGlobalSelector, (global) => global.expired)
