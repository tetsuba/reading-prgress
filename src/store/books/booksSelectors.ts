import * as R from 'ramda'
import { createSelector } from '@reduxjs/toolkit'
import { StateTypes } from '../store.types'
import {
    currentCollectionIdSelector,
    currentBookIdSelector
} from '../current/currentSelectors'
import {
    filteredStudentProgressByCollectionId,
    studentLastProgress,
    studentProgressSelector
} from '../students/studentsSelectors'
import { COMPLETED, getBookStatus, NOT_STARTED } from './books.utils'
import {
    SelectorCollectionsTypes,
    SelectorCollectionTypes
} from '../selector.types'
import { BookTypes } from '../../api/api-types'

const stateBooks = (state: StateTypes) => state.books

export const collectionSelector = createSelector(
    [stateBooks, currentCollectionIdSelector],
    (books, collectionId) =>
        books.find((collection) => collection.id === collectionId)
)

export const collectionsSelector = createSelector(
    [stateBooks, studentProgressSelector],
    (collections, progress): SelectorCollectionsTypes[] | undefined => {
        if (!collections) return undefined
        return collections.map((collection) => {
            return {
                ...R.pick(['id', 'title'])(collection),
                numberOfBooks: collection.books.length,
                completed: collection.books.every((book) =>
                    R.isNil(progress)
                        ? false
                        : progress.some((data) => {
                              const bookFound = R.allPass([
                                  R.propEq(collection.id, 'collectionId'),
                                  R.propEq(book.id, 'bookId')
                              ])(data)
                              return (
                                  bookFound &&
                                  R.equals(COMPLETED(), getBookStatus(data))
                              )
                          })
                )
            }
        })
    }
)

export const collectionWithBooksIconSelector = createSelector(
    [collectionSelector, filteredStudentProgressByCollectionId],
    (collection, progress): SelectorCollectionTypes | undefined => {
        if (!collection) return undefined
        return {
            title: collection.title,
            books: collection.books.map((book) => {
                return {
                    ...R.pick(['id', 'title'])(book),
                    iconColor: !progress
                        ? NOT_STARTED()
                        : R.compose(
                              getBookStatus,
                              R.find(R.propEq(book.id, 'bookId'))
                          )(progress)
                }
            })
        }
    }
)

export const collectionBooksSelector = createSelector(
    [collectionSelector],
    (collection) => (R.isNil(collection) ? undefined : collection.books)
)

export const bookSelector = createSelector(
    [collectionBooksSelector, currentBookIdSelector],
    (collectionBooks, bookId): BookTypes | undefined => {
        if (R.isNil(bookId) || collectionBooks === undefined) return undefined
        return collectionBooks.find(R.propEq(bookId, 'id'))
    }
)

export const lastBooksRead = createSelector(
    [stateBooks, studentLastProgress],
    (collection, studentProgress) => {
        if (studentProgress) {
            return studentProgress.map((progress) => {
                const getTitle = R.compose(
                    R.propOr('', 'title'),
                    R.find(R.propEq(progress.bookId, 'id')),
                    R.propOr([], 'books'),
                    R.find(R.propEq(progress.collectionId, 'id'))
                )

                return {
                    ...progress,
                    title: getTitle(collection)
                }
            })
        }
        return undefined
    }
)
