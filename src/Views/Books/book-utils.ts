import { ApiBookHistoryTypes, ApiBookTypes } from '../../api/api-types'

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

export function allBooksCompleted(books: ApiBookTypes[] | undefined): boolean {
    if (books !== undefined) {
        return books.every((book) => {
            if (book.history !== null) {
                return book.history[book.history.length - 1].words.length === 0
            }
            return false
        })
    }
    return false
}
