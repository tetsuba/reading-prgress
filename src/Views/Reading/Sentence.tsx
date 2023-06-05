import Button from '../../Components/Button/Button'
import Word from './Word'
import Svg from '../../Components/Svg/Svg'
import TAILWIND_CLASSES from '../../shared.tailwind'

export type WordTypes = {
    word: string
    status: string
}

type PropTypes = {
    sentence: WordTypes[]
    index: number
    count: number
    wordClickHandler?: (status: string, wordIndex: number) => void
    sentenceClickHandler?: () => void
}

export default function Sentence(props: PropTypes) {
    const completed = props.count > props.index ? 'hidden' : ''
    const active =
        props.count === props.index
            ? 'text-gray-800 delay-200'
            : 'opacity-30 text-gray-500 pointer-events-none'
    return (
        <div
            data-testid="sentence-block"
            className={`${active} ${completed} ${TAILWIND_CLASSES.sentenceBorder} relative`}
        >
            <Button
                data-testid="sentence-complete"
                template="svg"
                className="absolute right-2 bottom-1 hover:text-green-500"
                onClick={props.sentenceClickHandler}
            >
                <Svg icon="check-badge" />
            </Button>
            {props.sentence.map(({ word, status }, wordIndex) => {
                return (
                    <Word
                        key={`word-${word}-${wordIndex}`}
                        index={wordIndex}
                        status={status}
                        onClick={() => {
                            props.wordClickHandler &&
                                props.wordClickHandler(status, wordIndex)
                        }}
                    >
                        {word}
                    </Word>
                )
            })}
        </div>
    )
}
