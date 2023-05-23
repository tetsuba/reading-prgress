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
import { updateTracker } from '../../lib/service'

// STORE
import { updateBookHistory } from '../../store/book/bookSlice'
import { userIdSelector } from '../../store/user/userSelectors'
import { bookSelector } from '../../store/book/bookSelectors'

// COMPONENTS
import Button from '../../Components/Button/Button'
import Sentence from './Sentence'
import History from './History'
import Speech from '../../Components/Speech/Speech'
import Header from '../../Components/Header/Header'
import Svg from '../../Components/Svg/Svg'
import { useNavigate } from 'react-router-dom'
import ScrollTo from '../../Components/ScrollTo/ScrollTo'
import Main from '../../Components/Main/Main'

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

    return (
        <>
            <ScrollTo top={0} />
            <Header text={`${book.title}`}>
                <Button
                    className="ml-4 flex items-center place-self-start"
                    data-testid="back-button"
                    template="secondary"
                    onClick={() => navigate('/books')}
                >
                    <Svg icon="back" />
                    <span className="ml-2 hidden md:inline">Back to books</span>
                </Button>
            </Header>
            <Main>
                <>
                    {showHistory && (
                        <History
                            history={book.history}
                            story={story}
                            restart={() => {
                                setShowHistory(false)
                            }}
                        />
                    )}
                    {!showHistory && book.story && (
                        <>
                            <div className="flex justify-end">
                                <Speech
                                    story={story}
                                    count={count}
                                    setCount={setCount}
                                    setStory={setStory}
                                />
                                {count >= 1 && (
                                    <Button
                                        data-testid="sentence-back-button"
                                        template="svg"
                                        className={`mb-3 p-2 hover:bg-gray-100`}
                                        onClick={() => setCount(count - 1)}
                                    >
                                        <Svg icon="back" />
                                    </Button>
                                )}
                                {count < 1 && (
                                    <Button
                                        data-testid="history-button"
                                        template="svg"
                                        className={`mb-3 p-2 hover:border-white hover:bg-gray-100 hover:text-gray-900 focus:outline-none`}
                                        onClick={() => setShowHistory(true)}
                                    >
                                        <Svg icon="history" />
                                    </Button>
                                )}
                            </div>

                            {story.map((sentence, index) => {
                                return (
                                    <Sentence
                                        key={`sentence-${index}`}
                                        sentence={sentence}
                                        count={count}
                                        index={index}
                                        sentenceClickHandler={() =>
                                            setCount(count + 1)
                                        }
                                        wordClickHandler={(
                                            status,
                                            wordIndex
                                        ) => {
                                            story[count][wordIndex].status =
                                                status === STATUS.WRONG
                                                    ? STATUS.CORRECT
                                                    : STATUS.WRONG
                                            setStory([...story])
                                        }}
                                    />
                                )
                            })}
                        </>
                    )}
                </>
            </Main>
        </>
    )
}
