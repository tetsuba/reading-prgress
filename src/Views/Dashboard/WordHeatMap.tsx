export type WordHeatMapTypes = {
    word: string
    index: number
}

function maxNumber(num1: number, num2: number, max: number): number {
    const result = num1 * num2
    if (result < max) {
        return result
    } else {
        return max
    }
}

export default function WordHeatMap(props: WordHeatMapTypes) {
    const heatMapBG = `
        bg-red-${maxNumber(props.index, 10, 900)} 
        border-gray-${maxNumber(props.index, 10, 500)}
    `
    const heatMapNumber = `bg-red-${maxNumber(props.index, 50, 900)}`

    return (
        <span
            data-testid="heat-map-word"
            className={`mr-4 rounded border-2 p-3 ${heatMapBG}`}
        >
            <span className="font-bold text-gray-900">{props.word}</span>
            <span
                className={`ml-4 rounded-full py-1 px-3 text-white ${heatMapNumber}`}
            >
                {props.index}
            </span>
        </span>
    )
}
