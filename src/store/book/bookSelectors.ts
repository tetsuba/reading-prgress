import { createSelector } from '@reduxjs/toolkit'
import { StateBookTypes, StateTypes } from '../store-types'

const stateBook = (state: StateTypes) => state.book

export const bookSelector = createSelector(
    stateBook,
    (book: StateBookTypes) => book
)
