import { createSelector } from '@reduxjs/toolkit'
import { StateTypes } from '../store-types'

const stateBooks = (state: StateTypes) => state.books

export const booksSelector = createSelector(stateBooks, (books) => books)
