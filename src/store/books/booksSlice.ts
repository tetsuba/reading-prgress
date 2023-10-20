import { createSlice } from '@reduxjs/toolkit'
import { ActionTypes } from '../store.types'
import { ApiCollectionTypes } from '../../api/api-types'

export const initialState = [] as ApiCollectionTypes[] | []

interface UpdateBooksActionTypes extends ActionTypes {
    payload: ApiCollectionTypes[]
}

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBooks: (state, action: UpdateBooksActionTypes) => {
            return action.payload
        }
    }
})

export const { addBooks } = booksSlice.actions

export default booksSlice.reducer
