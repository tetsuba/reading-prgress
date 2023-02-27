import { createSelector } from '@reduxjs/toolkit'

const stateView = (state: any) => state.view

export const viewBooksSelector = createSelector(stateView, (view) => view.books)
