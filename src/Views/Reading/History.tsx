import H3 from '../../Components/H3/H3'
import { WordTypes } from './Sentence'
import { ApiBookHistoryTypes } from '../../lib/service-types'
import TAILWIND_CLASSES from '../../shared.tailwind'
import { wordsFound, wordsReadIncorrectly } from './reading-utils'
import { HistoryBackButton } from '../../Components/Button/Buttons'
import Loop from '../../Components/Loop/Loop'

type PropTypes = {
    story: WordTypes[][]
    history: ApiBookHistoryTypes[] | []
    restart: () => void
}

function HistoryHeader(props: PropTypes) {
    return (
        <div className="mb-4 flex items-center justify-between px-4">
            <H3 className="">{`I read this book ${props.history.length} times`}</H3>
            <HistoryBackButton onClick={props.restart} />
        </div>
    )
}

function HistoryBlock(props: { data?: ApiBookHistoryTypes }) {
    const status = wordsFound(props.data)
    return (
        <div data-testid="history-block">
            <div className="flex justify-between px-4 text-sm">
                <span>List of words to practice:</span>
                <span>Date: {props.data?.date}</span>
            </div>
            <div className={`${TAILWIND_CLASSES.getHistoryBorder(status)}`}>
                <span
                    className={`${TAILWIND_CLASSES.getHistoryFontColor(
                        status
                    )}`}
                >
                    {wordsReadIncorrectly(props.data)}
                </span>
            </div>
        </div>
    )
}

export default function History(props: PropTypes) {
    return (
        <>
            <HistoryHeader {...props} />
            <Loop array={props.history}>
                <HistoryBlock />
            </Loop>
        </>
    )
}
