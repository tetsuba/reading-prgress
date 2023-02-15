import H3 from '../../Components/H3/H3'
import Button from '../../Components/Button/Button'
import { WordTypes } from './Sentence'
import { Link } from 'react-router-dom'
import { buttonClasses } from '../../Components/Button/Button'
import { HistoryTypes } from '../../store/book/bookSlice'

type PropTypes = {
    story: WordTypes[][]
    history: HistoryTypes[] | []
    restart: () => void
}

export default function History(props: PropTypes) {
    return (
        <>
            <div className="flex justify-between">
                <H3 className="mb-8">{`I read this book ${props.history.length} times`}</H3>
                <div>
                    <Button clickHandler={props.restart} template="secondary">
                        Try again
                    </Button>
                    <Link
                        className={`ml-5 inline-block ${buttonClasses.primary}`}
                        to="/books"
                    >
                        Finished
                    </Link>
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
