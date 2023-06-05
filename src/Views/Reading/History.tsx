import H3 from '../../Components/H3/H3'
import Button from '../../Components/Button/Button'
import { WordTypes } from './Sentence'
import { ApiBookHistoryTypes } from '../../lib/service-types'
import Svg from '../../Components/Svg/Svg'
import TAILWIND_CLASSES from '../../shared.tailwind'
import {wordsFound, wordsReadIncorrectly} from './reading-utils'

type PropTypes = {
    story: WordTypes[][]
    history: ApiBookHistoryTypes[] | []
    restart: () => void
}

export default function History(props: PropTypes) {
    return (
        <>
            <div className="mb-4 flex items-center justify-between px-4">
                <H3 className="">{`I read this book ${props.history.length} times`}</H3>
                <Button
                    data-testid="history-back-button"
                    template="svg"
                    className={`p-2 text-blue-500 hover:bg-gray-100`}
                    onClick={props.restart}
                >
                    <Svg icon="back" />
                </Button>
            </div>

            {props.history
                .map((data, index) => {
                    const status = wordsFound(data)

                    return (
                        <div
                            data-testid="history-block"
                            key={`completed-${index}`}
                        >
                            <div className="flex justify-between px-4 text-sm">
                                <span>List of words to practice:</span>
                                <span>Date: {data.date}</span>
                            </div>
                            <div
                                className={`${TAILWIND_CLASSES.getHistoryBorder(
                                    status
                                )}`}
                            >
                                <span
                                    className={`${TAILWIND_CLASSES.getHistoryFontColor(
                                        status
                                    )}`}
                                >
                                    {wordsReadIncorrectly(data)}
                                </span>
                            </div>
                        </div>
                    )
                })
                .reverse()}
        </>
    )
}
