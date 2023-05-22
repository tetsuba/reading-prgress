import Button from '../../Components/Button/Button'
import Word from './Word'
import Svg from '../../Components/Svg/Svg'

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
            className={`${active} ${completed} min-h-96 relative mb-8 border-y-2 border-dashed border-gray-200 p-4 text-2xl transition-all duration-1000 md:rounded-lg md:border-x-2 md:p-6`}
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
