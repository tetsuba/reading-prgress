import { createSlice } from '@reduxjs/toolkit'
import {
    ActionTypes,
    StateBookTypes,
    StateBookHistoryTypes
} from '../store-types'
import { ApiBookTypes, ApiCollectionTypes } from '../../api/api-types'

const initialState = {
    bookId: 0,
    libId: '',
    history: [],
    story: [],
    title: ''
} as StateBookTypes

export type AddBookPayloadTypes = {
    book: ApiBookTypes
    libId: ApiCollectionTypes['id']
}

interface AddBookActionTypes extends ActionTypes {
    payload: AddBookPayloadTypes
}

interface UpdateBookHistoryActionTypes extends ActionTypes {
    payload: StateBookHistoryTypes[]
}

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        addBook: (state, action: AddBookActionTypes) => {
            const { book, libId } = action.payload
            state.bookId = book.id
            state.history = book.history || []
            state.story = book.story
            state.title = book.title
            state.libId = libId
        },
        updateBookHistory: (state, action: UpdateBookHistoryActionTypes) => {
            state.history = action.payload
        },
        resetBookToInitialState: () => initialState
    }
})

// Action creators are generated for each case reducer function
export const { addBook, updateBookHistory } = bookSlice.actions

export default bookSlice.reducer
