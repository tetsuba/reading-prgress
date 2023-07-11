import Word from './Word'
import TAILWIND_CLASSES from '../../shared.tailwind'
import { SentenceCompleteButton } from '../../Components/Button/Buttons'
import Loop from '../../Components/Loop/Loop'

export type WordTypes = {
    word: string
    status: string
}

type PropTypes = {
    data?: WordTypes[]
    index?: number
    count: number
    wordClickHandler: (
        status: string | undefined,
        wordIndex: number | undefined
    ) => void
    sentenceClickHandler: () => void
}

export default function Sentence(props: PropTypes) {
    const index = props.index || 0
    const completed = props.count > index ? 'hidden' : ''
    const active =
        props.count === props.index
            ? 'text-gray-800 delay-200'
            : 'opacity-30 text-gray-500 pointer-events-none'
    return (
        <div
            data-testid="sentence-block"
            className={`${active} ${completed} ${TAILWIND_CLASSES.sentenceBorder} relative`}
        >
            <SentenceCompleteButton onClick={props.sentenceClickHandler} />
            <Loop array={props.data || []}>
                <Word onClick={props.wordClickHandler} />
            </Loop>
        </div>
    )
}
