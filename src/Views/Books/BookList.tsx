import { useMutation, useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { deleteBook } from '../../lib/service'
import { userIdSelector } from '../../store/user/userSelectors'
import { addBook } from '../../store/book/bookSlice'
import { getBookStatusColour } from './book-utils'

// COMPONENTS
import Button from '../../Components/Button/Button'
import Modal from '../../Components/Modal/Modal'
import Confirmation from '../../Components/Modal/Confirmation'
import Svg from '../../Components/Svg/Svg'
import Input from '../../Components/Form/Input'
import AddBook from './AddBook'

export type BookTypes = {
    story: string
    title: string
    id: number
    history: string
}

type PropTypes = {
    list: BookTypes[]
    title: string
    clickHandlerBack: () => void
    delete: boolean
    libId: string
}

export default function BookList(props: PropTypes) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [book, setBook] = useState<null | BookTypes>(null)
    const [search, setSearch] = useState('')
    const userId = useSelector(userIdSelector)
    const queryClient = useQueryClient()
    const mutation = useMutation(deleteBook, {
        onSuccess: async (data) => {
            queryClient.setQueryData(['books', userId], data)
        }
    })

    return (
        <div data-testid="book-list">
            <div className="flex justify-end">
                <Button
                    type="button"
                    className="mb-6 mr-6 flex"
                    dataTestid="back-button"
                    template="primary"
                    clickHandler={props.clickHandlerBack}
                >
                    <Svg type="back" />
                    <span className="ml-2">Back</span>
                </Button>
            </div>
            <div className="rounded-t-lg bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="flex items-center text-lg font-bold text-gray-900">
                    <span className={`mr-6`}>
                        <Svg type="library" />
                    </span>
                    {props.title}
                </div>
                <div>
                    <Input
                        dataTestId="search"
                        value={search}
                        onChangeHandler={setSearch}
                        type="text"
                        placeholder="Search"
                    />
                </div>
                <div className="flex items-center justify-end text-lg font-bold text-gray-900">
                    {props.delete && <AddBook />}
                </div>
            </div>
            {props.list
                .filter((book) =>
                    book.title.toLowerCase().startsWith(search.toLowerCase())
                )
                .map((book, i) => {
                    const bookStatusColour = getBookStatusColour(book.history)
                    return (
                        <div
                            key={`book-list-${i}`}
                            className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${
                                i & 1 ? 'bg-white' : 'bg-gray-50'
                            }`}
                        >
                            <div className="flex items-center text-base font-medium text-gray-800">
                                <span className={`mr-6 ${bookStatusColour}`}>
                                    <Svg type="bookmark" />
                                </span>{' '}
                                {book.title}
                            </div>
                            <div className="mt-1 text-sm text-gray-900 sm:mt-0"></div>
                            <div className="mt-1 flex justify-end text-sm text-gray-900 sm:mt-0">
                                <Button
                                    type="button"
                                    dataTestid="book-list-read"
                                    template="secondary"
                                    clickHandler={() => {
                                        dispatch(
                                            addBook({
                                                book,
                                                libId: props.libId
                                            })
                                        )
                                        navigate('/reading')
                                    }}
                                >
                                    Read
                                </Button>
                                {props.delete && (
                                    <Button
                                        type="button"
                                        dataTestid="book-list-delete"
                                        template="icon"
                                        svg="delete"
                                        className="ml-2 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                                        clickHandler={() => {
                                            setBook(book)
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    )
                })}
            {book && (
                <Modal className="max-w-md">
                    <Confirmation
                        bookTile={book.title}
                        clickHandlerCancel={() => setBook(null)}
                        clickHandlerDelete={() => {
                            mutation.mutate(`?bookId=${book.id}`)
                            setBook(null)
                        }}
                    />
                </Modal>
            )}
        </div>
    )
}
