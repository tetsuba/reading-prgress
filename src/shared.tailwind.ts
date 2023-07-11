const TAILWIND_CLASSES = {
    FONT: {
        COLOR: {
            RED: 'text-red-500',
            GREEN: 'text-green-500'
        }
    },
    DASHED_BORDER: {
        DEFAULT: 'min-h-96 border-dashed md:border-x-2 border-gray-200',
        get ROUND() {
            return `${this.DEFAULT} border-y-2 md:rounded-lg`
        },
        get HEATMAP() {
            return `${this.DEFAULT} md:border-3 md:rounded-b-lg border-b-2 border-t-0`
        }
    },
    get sentenceBorder() {
        return `${this.DASHED_BORDER.ROUND} p-4 text-2xl md:p-6 mb-8`
    },
    get heatmapBorder() {
        return `${this.DASHED_BORDER.HEATMAP} p-2`
    },
    getHistoryBorder(status: boolean) {
        const statusClasses = status
            ? this.DASHED_BORDER.ROUND
            : this.DASHED_BORDER.ROUND.replace(
                  'border-gray-200',
                  'border-green-500'
              )
        return `${statusClasses} p-4 text-2xl md:p-6 mb-8`
    },
    getHistoryFontColor(status: boolean) {
        const statusClasses = status
            ? this.FONT.COLOR.RED
            : this.FONT.COLOR.GREEN
        return `${statusClasses}`
    }
}

export default TAILWIND_CLASSES
