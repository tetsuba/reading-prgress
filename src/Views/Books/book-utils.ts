import { HistoryTypes } from '../../store/book/bookSlice'

export function getBookStatusColour(history: HistoryTypes[] | null) {
    if (history) {
        const words = history[history.length - 1].words
        if (words.length) {
            return `text-red-500`
        }
        return 'text-green-500'
    }
    return 'text-gray-300'
}
