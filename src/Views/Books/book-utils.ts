import { ApiBookTypes, ApiCollectionTypes } from '../../api/api-types'
import * as R from 'ramda'
import { isUndefined } from '../../lib/monads'
import { CollectionPropTypes } from '../../Components/Row/CollectionRow'
import { ifElse, isEmpty } from 'ramda'

const returnBoolean = <T>(value: T) => value as boolean

export const getBooks = R.pathOr([], ['collection', 'books'])

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

const isBookHistoryCompleted = R.ifElse(historyIsNull, R.F, historyWordsEmpty)

export const allBooksCompleted = ifElse(
    isEmpty,
    R.F,
    R.all(isBookHistoryCompleted)
)
