import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import {
    buildStoryStructure,
    STATUS,
    getShortDate,
    getReadingMistakes
} from './reading-utils'
import { parseBookHistory } from '../../lib/utils'

// SERVICE
import { updateBook } from '../../lib/service'

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

export default function Reading() {
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
    const mutation = useMutation(updateBook, {
        onSuccess: async (data) => {
            queryClient.setQueryData(['books', userId], data)
            await queryClient.invalidateQueries(['words'])
            const history = data.data
                .filter(({ id }: { id: number }) => id === book.bookId)
                .map(({ history }: { history: string }) =>
                    parseBookHistory(history)
                )
            dispatch(updateBookHistory(history[0]))
        },
        onSettled() {
            setShowHistory(true)
        }
    })

    const completed = story.length <= count

    if (story.length && completed) {
        setStory(buildStoryStructure(book.story))
        setCount(0)
        const history = book.history.concat([
            {
                date: getShortDate(),
                words: getReadingMistakes(story)
            }
        ])

        const data = {
            id: book.bookId,
            history: JSON.stringify(history)
        }
        mutation.mutate(data)
    }

    return (
        <>
            <Header text={`Book: ${book.title}`} />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
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
                                <div className="flex place-content-between">
                                    <Speech
                                        story={story}
                                        count={count}
                                        setCount={setCount}
                                        setStory={setStory}
                                    />
                                    <Button
                                        dataTestid="history-button"
                                        title="View History"
                                        svg="history"
                                        template="icon"
                                        type="button"
                                        className={`mb-3 p-2 hover:border-white hover:bg-gray-100 hover:text-gray-900 focus:outline-none`}
                                        clickHandler={() =>
                                            setShowHistory(true)
                                        }
                                    />
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
                    </div>
                </div>
            </main>
        </>
    )
}
