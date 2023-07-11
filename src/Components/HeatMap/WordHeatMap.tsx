import { HeatMapColors } from './HeatMap'
import { WordTypes } from '../../Views/Reading/Sentence'
import Display from '../Dispay/Display'

export type WordHeatMapTypes = {
    data?: WordTypes
    index?: number
    max: number
    color: HeatMapColors
}

export default function WordHeatMap(props: WordHeatMapTypes) {
    const { index = 0, data = { word: '' } } = props
    const rgb = 255 * (index / props.max)
    const numberHeatMap = {
        backgroundColor: `rgb(${255 - rgb},${255 - rgb},${255 - rgb})`
    }
    const showBadge = index > 1

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
        return (index / props.max) * 100 > 50 ? 'text-white' : 'text-gray-900'
    }

    return (
        <span
            style={getBackGroundStyles()}
            data-testid="heat-map-word"
            className={`m-2 rounded-2xl border-2 p-3 md:m-5`}
        >
            <span className={`font-bold ${getTextStyles()}`}>{data.word}</span>
            <Display value={showBadge}>
                <span
                    style={numberHeatMap}
                    className={`ml-1 rounded-full py-1 px-2 text-white md:ml-3`}
                >
                    {props.index}
                </span>
            </Display>
        </span>
    )
}
