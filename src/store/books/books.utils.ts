import * as R from 'ramda'

export const NOT_STARTED = R.always('text-gray-300')
const INCOMPLETE = R.always('text-red-500')
export const COMPLETED = R.always('text-green-500')

const historyLastWords = R.compose(R.prop('words'), R.last, R.prop('history'))

export const bookStatus = R.compose(
    R.ifElse(R.equals(0), COMPLETED, INCOMPLETE),
    R.ifElse(R.isNil, R.always(0), R.length),
    R.prop('words'),
    R.last,
    R.prop('history')
)
export const getBookStatus = R.ifElse(R.isNil, NOT_STARTED, bookStatus)
