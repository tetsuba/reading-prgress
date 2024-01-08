import * as R from 'ramda'
import WordHeatMap from './WordHeatMap'
import H3 from '../H3/H3'
import TAILWIND_CLASSES from '../../shared.tailwind'
import Loop from '../Loop/Loop'
import { WordTypes } from '../../api/api-types'

export type HeatMapColors = 'red' | 'blue' | 'green' | 'none'

type PropTypes = {
    words: WordTypes[] | undefined
    search: string
    children: string
    color: HeatMapColors
}

const diff = (a: number, b: number) => b - a

const findMax = R.compose(
    R.prop(0),
    (list) => (list as number[]).sort(diff),
    R.map(R.prop('index'))
)

export default function HeatMap(props: PropTypes) {
    function sightWords(words: WordTypes) {
        const regEx = new RegExp(props.search.toLowerCase(), 'g')
        return regEx.test(words.word.toLowerCase())
    }

    if (R.isNil(props.words)) return <>loading...</>
    const max: number = findMax(props.words)

    return (
        <>
            <H3 className="mt-10 bg-gray-200 p-2 md:rounded-t-lg">
                {props.children}
            </H3>
            <div
                data-testid="heat-map"
                className={`${TAILWIND_CLASSES.heatmapBorder} inline-flex w-full flex-wrap items-center justify-center shadow-md`}
            >
                <Loop array={props.words.filter(sightWords)}>
                    <WordHeatMap color={props.color} max={max} />
                </Loop>
            </div>
        </>
    )
}
