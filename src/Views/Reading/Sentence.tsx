import Button from '../../Components/Button/Button'
import Word from './Word'

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
            className={`${active} ${completed} min-h-96 relative mb-8 rounded-lg border-4 border-dashed border-gray-200 p-6 text-2xl transition-all duration-1000`}
        >
            <Button
                dataTestid="sentence-complete"
                template="icon"
                type="button"
                svg="check-badge"
                className="absolute right-1 bottom-1 hover:text-green-500"
                clickHandler={props.sentenceClickHandler}
            />
            {props.sentence.map(({ word, status }, wordIndex) => {
                return (
                    <Word
                        key={`word-${word}-${wordIndex}`}
                        index={wordIndex}
                        status={status}
                        clickHandler={() => {
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
