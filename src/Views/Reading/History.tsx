import H3 from '../../Components/H3/H3'
import Button from '../../Components/Button/Button'
import { WordTypes } from './Sentence'
import { ApiBookHistoryTypes } from '../../lib/service-types'

type PropTypes = {
    story: WordTypes[][]
    history: ApiBookHistoryTypes[] | []
    restart: () => void
}

export default function History(props: PropTypes) {
    return (
        <>
            <div className="flex justify-between">
                <H3 className="mb-8">{`I read this book ${props.history.length} times`}</H3>
                <div>
                    <Button
                        dataTestid="history-back-button"
                        title="Back"
                        svg="back"
                        template="icon"
                        type="button"
                        className={`mb-3 p-2 text-blue-500 hover:border-white hover:bg-gray-100 hover:text-blue-600 focus:outline-none`}
                        clickHandler={props.restart}
                    />
                </div>
            </div>

            {props.history
                .map((data, index) => {
                    const notCompleted = data.words.length > 0
                    const textColor = notCompleted
                        ? 'text-red-500 border-gray-200'
                        : 'text-green-500 border-green-500'
                    return (
                        <div
                            data-testid="history-block"
                            key={`completed-${index}`}
                        >
                            <div className="flex justify-between">
                                <span>List of words to practice:</span>
                                <span>Date: {data.date}</span>
                            </div>
                            <div
                                className={`${textColor} min-h-96 relative mb-8 rounded-lg border-4 border-dashed p-6 text-2xl`}
                            >
                                <span>
                                    {notCompleted ? (
                                        data.words
                                            .toString()
                                            .replace(/,/g, ', ')
                                    ) : (
                                        <>100% Completed</>
                                    )}
                                </span>
                            </div>
                        </div>
                    )
                })
                .reverse()}
        </>
    )
}
