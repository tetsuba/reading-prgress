import * as R from 'ramda'
import { HeatMapColors, HeatMapWordTypes } from './HeatMap'
import Display from '../Dispay/Display'

export type WordHeatMapTypes = {
    data?: HeatMapWordTypes
    index?: number
    max: number
    color: HeatMapColors
}

const sub255 = R.subtract(255)
const multi255 = R.multiply(255)

const backgroundBlack = (rgb: number): string =>
    `rgb(${sub255(rgb)}, ${sub255(rgb)}, ${sub255(rgb)})`
const backgroundRed = (rgb: number): string =>
    `rgb(255, ${sub255(rgb)}, ${sub255(rgb)})`
const backgroundBlue = (rgb: number): string =>
    `rgb(${sub255(rgb)}, ${sub255(rgb / 2)}, 255)`
const backgroundGreen = (rgb: number): string =>
    `rgb(${sub255(rgb)}, ${sub255(rgb / 3)}, ${sub255(rgb)})`
const backgroundNone = (): string => 'rgb(230, 230, 230)'

const backgroundStyles = R.cond([
    [R.equals('red'), () => backgroundRed],
    [R.equals('blue'), () => backgroundBlue],
    [R.equals('green'), () => backgroundGreen],
    [R.equals('none'), () => backgroundNone]
])

function getTextStyles(props: WordHeatMapTypes) {
    const { data = { index: 0 } } = props

    if (props.color === 'none') {
        return 'text-gray-900'
    }
    return (data.index / props.max) * 100 > 50 ? 'text-white' : 'text-gray-900'
}

export default function WordHeatMap(props: WordHeatMapTypes) {
    const { data = { word: '', index: 0 } } = props
    const rgb: number = multi255(data.index / props.max)
    const showBadge = R.gt(data.index, 1)
    const backgroundColor = backgroundStyles(props.color)

    return (
        <span
            style={{ backgroundColor: backgroundColor(rgb) }}
            data-testid="heat-map-word"
            className={`m-2 rounded-2xl border-2 p-3 md:m-5`}
        >
            <span className={`font-bold ${getTextStyles(props)}`}>
                {data.word}
            </span>
            <Display value={showBadge}>
                <span
                    style={{ backgroundColor: backgroundBlack(rgb) }}
                    className={`ml-1 rounded-full px-2 py-1 text-white md:ml-3`}
                >
                    {data.index}
                </span>
            </Display>
        </span>
    )
}
