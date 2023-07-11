import { ApiBookHistoryTypes, ApiBookTypes } from '../../lib/service-types'

export function getBookStatusColour(
    history: ApiBookHistoryTypes[] | undefined
) {
    if (history && history.length) {
        const words = history[history.length - 1].words
        if (words.length) {
            return `text-red-500`
        }
        return 'text-green-500'
    }
    return 'text-gray-300'
}

export function filterBooks(books: ApiBookTypes[] | undefined, search: string) {
    return (
        books &&
        books.filter((book) =>
            book.title.toLowerCase().startsWith(search.toLowerCase())
        )
    )
}
