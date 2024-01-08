import { BookTypes } from '../../api/api-types'
import * as R from 'ramda'
import { ifElse, isEmpty } from 'ramda'

export const getBooks = R.pathOr([], ['collection', 'books'])

export function filterBooksByTitle(
    books: BookTypes[],
    search: string
): BookTypes[] | [] {
    return books.filter((book) =>
        book.title.toLowerCase().startsWith(search.toLowerCase())
    )
}

export const greenText = R.always('text-green-500')

const historyWordsEmpty = R.compose(
    R.isEmpty,
    R.prop('words'),
    R.last,
    R.prop('history')
)

const historyIsNull = R.compose(R.isNil, R.prop('history'))

const isBookHistoryCompleted = R.ifElse(historyIsNull, R.F, historyWordsEmpty)

export const allBooksCompleted = ifElse(
    isEmpty,
    R.F,
    R.all(isBookHistoryCompleted)
)
