import WordHeatMap from './WordHeatMap'
import H3 from '../H3/H3'

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
            <H3 className="mt-10 rounded-t-lg bg-gray-200 p-2">
                {props.children}
            </H3>
            <div
                data-testid="heat-map"
                className="min-h-96 md:border-3 inline-flex w-full flex-wrap items-center justify-center rounded-b-lg border-2 border-t-0 border-dashed border-gray-200 p-2 shadow-md"
            >
                {props.words.filter(sightWords).map(heatMap)}
            </div>
        </>
    )
}
