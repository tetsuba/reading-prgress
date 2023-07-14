import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import {
    buildStoryStructure,
    findBookHistory,
    isReadingCompleted,
    prepareTrackerData,
    STATUS
} from './reading-utils'

// SERVICE

// STORE
import { updateBookHistory } from '../../store/book/bookSlice'
import { userIdSelector } from '../../store/user/userSelectors'
import { bookSelector } from '../../store/book/bookSelectors'

// COMPONENTS
import Sentence from './Sentence'
import History from './History'
import Speech from '../../Components/Speech/Speech'
import Header from '../../Components/Header/Header'
import { useNavigate } from 'react-router-dom'
import ScrollTo from '../../Components/ScrollTo/ScrollTo'
import Main from '../../Components/Main/Main'
import {
    BackToBooksButton,
    HistoryButton,
    SentenceBackButton
} from '../../Components/Button/Buttons'
import Display from '../../Components/Dispay/Display'
import Loop from '../../Components/Loop/Loop'
import { updateTracker } from '../../api/tracker'

export default function Reading() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    // SELECTORS
    const book = useSelector(bookSelector)
    const userId = useSelector(userIdSelector)
    // STATES
    const [story, setStory] = useState(buildStoryStructure(book.story))
    const [count, setCount] = useState(0)
    const [showHistory, setShowHistory] = useState(false)
    // SERVICES
    const mutation = useMutation(updateTracker, {
        onSuccess: async (data) => {
            queryClient.setQueryData(['books', userId], data)
            await queryClient.invalidateQueries(['words'])
            const history = findBookHistory(data.data, book)
            dispatch(updateBookHistory(history))
        },
        onSettled() {
            setShowHistory(true)
        }
    })

    if (isReadingCompleted(story, count)) {
        setStory(buildStoryStructure(book.story))
        setCount(0)
        mutation.mutate(prepareTrackerData(userId, book, story))
    }

    function updateStoryState(
        status: string | undefined,
        wordIndex: number | undefined
    ) {
        if (status !== undefined && wordIndex !== undefined) {
            story[count][wordIndex].status =
                status === STATUS.WRONG ? STATUS.CORRECT : STATUS.WRONG
            setStory([...story])
        }
    }

    return (
        <>
            <ScrollTo top={0} />
            <Header text={`${book.title}`}>
                <BackToBooksButton onClick={() => navigate('/books')} />
            </Header>
            <Main>
                <Display value={showHistory}>
                    <History
                        history={book.history}
                        story={story}
                        restart={() => {
                            setShowHistory(false)
                        }}
                    />
                </Display>
                <Display value={!showHistory && !!book.story}>
                    <>
                        <div className="flex justify-end">
                            <Display value={count >= 1}>
                                <SentenceBackButton
                                    onClick={() => setCount(count - 1)}
                                />
                            </Display>
                            <Display value={count < 1}>
                                <HistoryButton
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
