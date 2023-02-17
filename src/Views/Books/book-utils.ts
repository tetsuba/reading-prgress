export function getBookStatusColour(history: string | null) {
    if (history) {
        const data = JSON.parse(history)
        const words = data[data.length - 1].words
        if (words.length) {
            return `text-red-500`
        }
        return 'text-green-500'
    }
    return 'text-gray-300'
}
