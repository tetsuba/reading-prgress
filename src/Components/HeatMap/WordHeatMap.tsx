import { HeatMapColors } from './HeatMap'

export type WordHeatMapTypes = {
    word: string
    index: number
    max: number
    color: HeatMapColors
}

export default function WordHeatMap(props: WordHeatMapTypes) {
    const rgb = 255 * (props.index / props.max)
    const numberHeatMap = {
        backgroundColor: `rgb(${255 - rgb},${255 - rgb},${255 - rgb})`
    }
    const showBadge = props.index > 1

    function getBackGroundStyles() {
        if (props.color === 'red') {
            return { backgroundColor: `rgb(255,${255 - rgb},${255 - rgb})` }
        }
        if (props.color === 'blue') {
            return {
                backgroundColor: `rgb(${255 - rgb}, ${255 - rgb / 2}, 255)`
            }
        }
        if (props.color === 'green') {
            return {
                backgroundColor: `rgb(${255 - rgb}, ${255 - rgb / 3}, ${
                    255 - rgb
                })`
            }
        }
        if (props.color === 'none') {
            return { backgroundColor: 'rgb(230,230,230)' }
        }
    }

    function getTextStyles() {
        if (props.color === 'none') {
            return 'text-gray-900'
        }
        return (props.index / props.max) * 100 > 50
            ? 'text-white'
            : 'text-gray-900'
    }

    return (
        <span
            style={getBackGroundStyles()}
            data-testid="heat-map-word"
            className={`m-6 rounded-2xl border-2 p-3`}
        >
            <span className={`font-bold ${getTextStyles()}`}>{props.word}</span>
            {showBadge && (
                <span
                    style={numberHeatMap}
                    className={`ml-4 rounded-full py-1 px-3 text-white`}
                >
                    {props.index}
                </span>
            )}
        </span>
    )
}
