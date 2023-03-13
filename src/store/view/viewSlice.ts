import { createSlice } from '@reduxjs/toolkit'
import { BookTypes } from '../../Views/Books/BookList'

export type CollectionTypes = {
    id: string
    title: string
    description: string
    books: BookTypes[]
}

type BooksViewTypes = {
    collection: CollectionTypes | null
}

type GlobalViewTypes = {
    expired: boolean
}

export interface ViewTypes {
    books: BooksViewTypes
    global: GlobalViewTypes
}

const initialState = {
    books: {
        collection: null
    },
    global: {
        expired: false
    }
} as ViewTypes

export const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        updateViewBookCollection: (state, action) => {
            state.books.collection = action.payload
        },
        toggleViewGlobalExpired: (state, action) => {
            state.global.expired = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { updateViewBookCollection, toggleViewGlobalExpired } =
    viewSlice.actions

export default viewSlice.reducer
