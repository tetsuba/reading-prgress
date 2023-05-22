import { ApiBookHistoryTypes } from '../../lib/service-types'

export function getBookStatusColour(history: ApiBookHistoryTypes[] | null) {
    if (history && history.length) {
        const words = history[history.length - 1].words
        if (words.length) {
            return `text-red-500`
        }
        return 'text-green-500'
    }
    return 'text-gray-300'
}
