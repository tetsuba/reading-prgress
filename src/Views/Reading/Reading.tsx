import { useState } from 'react'
import * as R from 'ramda'
import { useMutation, useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    buildStoryStructure,
    findBookHistory,
    isReadingCompleted,
    toggleStatus,
    transformStoryToTrackerHistory
} from './reading-utils'
import { updateTracker } from '../../api/tracker'
import { ApiBookHistoryTypes } from '../../api/api-types'
import { notUndefined } from '../../lib/utils'

// STORE
import { updateBookHistory } from '../../store/book/bookSlice'
import { userIdSelector } from '../../store/user/userSelectors'
import { bookSelector } from '../../store/book/bookSelectors'

// COMPONENTS
import Sentence from './Sentence'
import History from './History'
import Header from '../../Components/Header/Header'
import ScrollTo from '../../Components/ScrollTo/ScrollTo'
import Main from '../../Components/Main/Main'
import {
    BackToBooksButton,
    HistoryButton,
    SentenceBackButton
} from '../../Components/Button/Buttons'
import Display from '../../Components/Dispay/Display'
import Loop from '../../Components/Loop/Loop'

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

    if (isReadingCompleted(story.length, count)) {
        setStory(buildStoryStructure(book.story))
        setCount(0)

        const trackerData = {
            userId,
            bookId: book.bookId,
            libId: book.libId,
            history: transformStoryToTrackerHistory(story)
                .concat(book.history)
                .emit()
        }
        mutation.mutate(trackerData)
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

    return (
        <>
            <ScrollTo top={0} />
            <Header text={`${book.title}`}>
                <BackToBooksButton onClick={() => navigate('/books')} />
            </Header>
            <Main>
                <Display value={showHistory}>
                    <History
                        history={R.reverse(book.history)}
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
