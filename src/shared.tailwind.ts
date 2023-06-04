
const TAILWIND_CLASSES = {
    DASHED_BORDER: {
        DEFAULT: 'min-h-96 border-dashed md:border-x-2 ',
        get HISTORY() {
            return `${this.DEFAULT} border-y-2 md:rounded-lg`
        },
        get SENTENCE() {
            return `${this.DEFAULT} border-y-2 border-gray-200 md:rounded-lg`
        },
        get HEATMAP() {
            return `${this.DEFAULT} md:border-3 md:rounded-b-lg border-b-2 border-t-0 border-gray-200`
        },
    },

    get historyBorder() {
        return `${this.DASHED_BORDER.HISTORY} p-4 text-2xl md:p-6 mb-8`
    },
    get sentenceBorder() {
        return `${this.DASHED_BORDER.SENTENCE} p-4 text-2xl md:p-6 mb-8`
    },
    get heatmapBorder() {
        return `${this.DASHED_BORDER.HEATMAP} p-2`
    }
}

export default TAILWIND_CLASSES
