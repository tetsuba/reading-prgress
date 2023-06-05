import WordHeatMap from './WordHeatMap'
import H3 from '../H3/H3'
import TAILWIND_CLASSES from '../../shared.tailwind'

export type HeatMapColors = 'red' | 'blue' | 'green' | 'none'

type WordTypes = {
    word: string
    index: number
}

type PropTypes = {
    words: WordTypes[]
    search: string
    children: string
    color: HeatMapColors
}
export default function HeatMap(props: PropTypes) {
    const max = props.words.map(({ index }) => index).sort((a, b) => b - a)[0]

    function sightWords(words: WordTypes) {
        const regEx = new RegExp(props.search.toLowerCase(), 'g')
        return regEx.test(words.word.toLowerCase())
    }

    function heatMap(words: WordTypes, i: number) {
        return (
            <WordHeatMap
                color={props.color}
                max={max}
                key={`word-${i}`}
                word={words.word}
                index={words.index}
            />
        )
    }

    return (
        <>
            <H3 className="mt-10 bg-gray-200 p-2 md:rounded-t-lg">
                {props.children}
            </H3>
            <div
                data-testid="heat-map"
                className={`${TAILWIND_CLASSES.heatmapBorder} inline-flex w-full flex-wrap items-center justify-center shadow-md`}
            >
                {props.words.filter(sightWords).map(heatMap)}
            </div>
        </>
    )
}
