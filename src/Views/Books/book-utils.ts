import { ApiBookTypes, ApiCollectionTypes } from '../../api/api-types'
import * as R from 'ramda'
import { isUndefined } from '../../lib/monads'
import { CollectionPropTypes } from './CollectionRow'

const returnBoolean = <T>(value: T) => value as boolean

export const getBooks = R.pathOr([], ['collection', 'books'])
export const collectionTitle: (v: CollectionPropTypes) => string = R.pathOr(
    '',
    ['data', 'title']
)
export const numberOfBooks: (v: CollectionPropTypes) => string = R.compose(
    R.ifElse(R.isEmpty, R.empty, (text: string): string => `(${text})`),
    R.pathOr('', ['data', 'books', 'length'])
)
export function filterBooksByTitle(
    books: ApiBookTypes[],
    search: string
): ApiBookTypes[] | [] {
    return books.filter((book) =>
        book.title.toLowerCase().startsWith(search.toLowerCase())
    )
}

const defaultText = R.always('text-gray-300')
const greenText = R.always('text-green-500')
const redText = R.always('text-red-500')

const getIconColor = R.compose(
    R.ifElse(R.isEmpty, greenText, redText),
    R.prop('words'),
    R.last
)

export const getIconColorForBookRow = R.compose(
    R.ifElse(R.isEmpty, defaultText, getIconColor),
    R.pathOr([], ['history'])
)

const historyWordsEmpty = R.compose(
    R.isEmpty,
    R.prop('words'),
    R.last,
    R.prop('history')
)

const historyIsNull = R.compose(R.isNil, R.prop('history'))

// ifElse
const isBookHistoryCompleted = R.ifElse(historyIsNull, R.F, historyWordsEmpty)

const booksCompleted = (data: ApiCollectionTypes | undefined) =>
    isUndefined(data)
        .map(R.all(isBookHistoryCompleted))
        .fold(R.F, returnBoolean)

export const allBooksCompleted = R.compose(booksCompleted, R.path(['books']))
