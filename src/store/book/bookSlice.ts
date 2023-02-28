import { createSlice } from '@reduxjs/toolkit'
import { parseBookHistory } from '../../lib/utils'

export type HistoryTypes = {
    date: string
    words: string[]
}

export interface BookTypes {
    bookId: string
    libId: string
    history: HistoryTypes[] | []
    story: string
    title: string
}

const initialState = {
    bookId: '',
    libId: '',
    history: [],
    story: '',
    title: ''
} as BookTypes

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        addBook: (state, action) => {
            const { book, libId } = action.payload
            const history = book.history
                ? typeof book.history === 'string'
                    ? parseBookHistory(book.history)
                    : book.history
                : []

            state.bookId = book.id
            state.history = history
            state.story = book.story
            state.title = book.title
            state.libId = libId
        },
        updateBookHistory: (state, action) => {
            state.history = action.payload
        },
        resetBookToInitialState: () => initialState
    }
})

// Action creators are generated for each case reducer function
export const { addBook, updateBookHistory } = bookSlice.actions

export default bookSlice.reducer
