import { createSlice } from '@reduxjs/toolkit'
import { parseBookHistory } from '../../lib/utils'

export type HistoryTypes = {
    date: string
    words: string[]
}

export interface BookTypes {
    bookId: string
    history: HistoryTypes[] | []
    story: string
    title: string
}

const initialState = {
    bookId: '',
    history: [],
    story: '',
    title: ''
} as BookTypes

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.bookId = action.payload.id
            state.history = parseBookHistory(action.payload.history)
            state.story = action.payload.story
            state.title = action.payload.title
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
