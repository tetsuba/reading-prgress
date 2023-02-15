import { createSelector } from '@reduxjs/toolkit'

const stateBook = (state: any) => state.book

export const bookSelector = createSelector(stateBook, (book) => book)
