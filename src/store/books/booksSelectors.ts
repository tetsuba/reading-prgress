import { createSelector } from '@reduxjs/toolkit'
import { StateTypes } from '../store.types'
import {
    currentCollectionIdSelector,
    currentBookIdSelector
} from '../current/currentSelectors'
import {
    studentLastProgressUpdate,
    studentProgressSelector
} from '../students/studentsSelectors'

const stateBooks = (state: StateTypes) => state.books

export const booksSelector = createSelector(stateBooks, (books) => books)
export const collectionSelector = createSelector(
    [stateBooks, currentCollectionIdSelector],
    (books, collectionId) =>
        books.find((collection) => collection.id === collectionId)
)

export const bookSelector = createSelector(
    [collectionSelector, currentBookIdSelector],
    (collection, bookId) => {
        return collection === undefined
            ? undefined
            : collection.books.find((book) => book.id === bookId)
    }
)

export const lastBooksRead = createSelector(
    [stateBooks, studentLastProgressUpdate],
    (collection, studentProgress) => {
        if (studentProgress) {
            return studentProgress.map((progress) => {
                const bookTitle = collection
                    .find((col) => col.id == progress.collectionId)
                    ?.books.find((book) => book.id === progress.bookId)?.title

                return {
                    title: bookTitle,
                    ...progress
                }
            })
        }
        return undefined
    }
)
