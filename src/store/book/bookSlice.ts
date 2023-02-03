import { createSlice } from '@reduxjs/toolkit'

export interface BookTypes {
    bookId: string
    difficulty: string
    story: string
    title: string
}

const initialState = {
    bookId: '',
    difficulty: '',
    story: '',
    title: ''
} as BookTypes

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.bookId = action.payload.id
            state.difficulty = action.payload.difficulty
            state.story = action.payload.story
            state.title = action.payload.title
        },
        resetBookToInitialState: () => initialState
    }
})

// Action creators are generated for each case reducer function
export const { addBook } = bookSlice.actions

export default bookSlice.reducer
