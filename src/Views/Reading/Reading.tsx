import { useState } from 'react'
import * as R from 'ramda'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    buildStoryStructure,
    isReadingCompleted,
    toggleStatus
} from './reading-utils'
import { notUndefined } from '../../lib/utils'

// CUSTOM HOOK
import useUpdateStudentProgress from './useUpdateStudentProgress'

// STORE
import { bookSelector } from '../../store/books/booksSelectors'
import { studentProgressBookHistorySelector } from '../../store/students/studentsSelectors'

// COMPONENTS
import Sentence from './Sentence'
import History from './History'
import SubHeader from '../../Components/SubHeader/SubHeader'
import ScrollTo from '../../Components/ScrollTo/ScrollTo'
import Main from '../../Components/Main/Main'
import Display from '../../Components/Dispay/Display'
import Loop from '../../Components/Loop/Loop'
import Button from '../../Components/Button/Button'

export default function Reading() {
    const navigate = useNavigate()

    // SELECTORS
    const book = useSelector(bookSelector)
    const studentProgressHistory = useSelector(
        studentProgressBookHistorySelector
    )

    // STATES
    const [story, setStory] = useState(
        buildStoryStructure(book ? book.story : [])
    )
    const [count, setCount] = useState(0)
    const [showHistory, setShowHistory] = useState(false)

    // CUSTOM STATE
    const updateStudentProgress = useUpdateStudentProgress(setShowHistory)

    if (isReadingCompleted(story.length, count) && book) {
        updateStudentProgress(story)
        setCount(0)
        setStory(buildStoryStructure(book.story))
    }

    function updateStoryState(
        status: string | undefined,
        wordIndex: number | undefined
    ) {
        if (notUndefined(status) && notUndefined(wordIndex)) {
            story[count][wordIndex as number].status = toggleStatus(
                status as string
            )
            setStory([...story])
        }
    }

    if (!book) {
        return <div>Loading...</div>
    }

    return (
        <>
            <ScrollTo top={0} />
            <SubHeader text={`${book.title}`}>
                <Button
                    className="ml-4 flex items-center place-self-start"
                    data-testid="back-button"
                    icon="back"
                    template="secondary"
                    onClick={() => navigate('/books')}
                >
                    <span className="ml-2 hidden md:inline">Back to books</span>
                </Button>
            </SubHeader>
            <Main>
                <Display value={showHistory}>
                    <History
                        history={R.reverse(studentProgressHistory)}
                        story={story}
                        restart={() => {
                            setShowHistory(false)
                        }}
                    />
                </Display>
                <Display value={R.not(showHistory) && !!book.story}>
                    <>
                        <div className="flex justify-end">
                            <Display value={count >= 1}>
                                <Button
                                    data-testid="sentence-back-button"
                                    icon="back"
                                    template="icon-back"
                                    className={`mb-3 p-2`}
                                    onClick={() => setCount(count - 1)}
                                />
                            </Display>
                            <Display value={count < 1}>
                                <Button
                                    data-testid="history-button"
                                    icon="history"
                                    template="icon-history"
                                    className={`mb-3`}
                                    onClick={() => setShowHistory(true)}
                                />
                            </Display>
                        </div>
                        <Loop array={story}>
                            <Sentence
                                count={count}
                                sentenceClickHandler={() => setCount(count + 1)}
                                wordClickHandler={updateStoryState}
                            />
                        </Loop>
                    </>
                </Display>
            </Main>
        </>
    )
}
