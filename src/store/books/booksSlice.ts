import { createSlice } from '@reduxjs/toolkit'
import { ActionUpdateBooksTypes, StateBooksTypes } from '../store.types'

export const initialState: StateBooksTypes | [] = []

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBooks: (state, action: ActionUpdateBooksTypes) => {
            return action.payload
        }
    }
})

export const { addBooks } = booksSlice.actions

export default booksSlice.reducer
