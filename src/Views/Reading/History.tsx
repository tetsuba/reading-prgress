import H3 from '../../Components/H3/H3'
import { HistoryTypes } from '../../api/api-types'
import TAILWIND_CLASSES from '../../shared.tailwind'
import {
    doesHistoryHaveWords,
    getHistoryWords,
    WordStatusTypes
} from './reading-utils'
import Loop from '../../Components/Loop/Loop'
import Button from '../../Components/Button/Button'

type PropTypes = {
    story: WordStatusTypes[][]
    history: HistoryTypes[] | []
    restart: () => void
}

function HistoryHeader(props: PropTypes) {
    return (
        <div className="mb-4 flex items-center justify-between px-4">
            <H3 className="">{`I read this book ${props.history.length} times`}</H3>
            <Button
                data-testid="history-back-button"
                icon="back"
                template="icon-back"
                onClick={props.restart}
            />
        </div>
    )
}

function HistoryBlock(props: { data?: HistoryTypes }) {
    const status: boolean = doesHistoryHaveWords(props)
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
                    {getHistoryWords(props)}
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
