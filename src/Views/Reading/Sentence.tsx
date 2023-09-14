import Word from './Word'
import TAILWIND_CLASSES from '../../shared.tailwind'
import Loop from '../../Components/Loop/Loop'
import Button from '../../Components/Button/Button'

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
    const active =
        props.count === props.index
            ? 'text-gray-800 delay-200'
            : 'opacity-30 text-gray-500 pointer-events-none'

    if (props.count > index) {
        return <></>
    }

    return (
        <div
            data-testid="sentence-block"
            className={`${active} ${TAILWIND_CLASSES.sentenceBorder} relative`}
        >
            <Button
                className="absolute bottom-1 right-2"
                data-testid="sentence-complete"
                icon="check-badge"
                template="icon-check-badge"
                onClick={props.sentenceClickHandler}
            />
            <Loop array={props.data || []}>
                <Word onClick={props.wordClickHandler} />
            </Loop>
        </div>
    )
}
