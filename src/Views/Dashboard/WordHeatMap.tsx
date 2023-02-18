export type WordHeatMapTypes = {
    word: string
    index: number
}

function getHeatMap(index: number) {
    if (index < 2) {
        return { number: '', bg: 'border-gray-100', text: 'text-gray-900' }
    } else if (index < 5) {
        return {
            number: 'bg-red-100',
            bg: 'border-gray-100 bg-red-50',
            text: 'text-gray-900'
        }
    } else if (index < 10) {
        return {
            number: 'bg-red-300',
            bg: 'border-gray-100 bg-red-100',
            text: 'text-gray-800'
        }
    } else if (index < 15) {
        return {
            number: 'bg-red-400',
            bg: 'border-gray-200 bg-red-100',
            text: 'text-gray-700'
        }
    } else if (index < 20) {
        return {
            number: 'bg-red-500',
            bg: 'border-gray-300 bg-red-200',
            text: 'text-gray-600'
        }
    } else {
        return {
            number: 'bg-black',
            bg: 'border-gray-300 bg-red-500',
            text: 'text-white'
        }
    }
}

export default function WordHeatMap(props: WordHeatMapTypes) {
    const heatMap = getHeatMap(props.index)

    return (
        <span
            data-testid="heat-map-word"
            className={`m-6 rounded-2xl border-2 p-3 ${heatMap.bg}`}
        >
            <span className={`font-bold text-gray-900 ${heatMap.text}`}>
                {props.word}
            </span>
            <span
                className={`ml-4 rounded-full py-1 px-3 text-white ${heatMap.number}`}
            >
                {props.index}
            </span>
        </span>
    )
}
