import { createSlice } from '@reduxjs/toolkit'

export type HistoryTypes = {
    date: string
    words: string[]
}

export interface BookTypes {
    bookId: number
    libId: string
    history: HistoryTypes[] | []
    story: string
    title: string
}

const initialState = {
    bookId: 0,
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
            state.bookId = book.id
            state.history = book.history || []
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
