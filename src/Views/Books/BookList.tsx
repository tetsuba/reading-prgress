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
import { ApiBookTypes } from '../../lib/service-types'

type PropTypes = {
    list: ApiBookTypes[]
    title: string
    clickHandlerBack: () => void
    delete: boolean
    libId: string
}

export default function BookList(props: PropTypes) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [book, setBook] = useState<null | ApiBookTypes>(null)
    const [search, setSearch] = useState('')
    const userId = useSelector(userIdSelector)
    const queryClient = useQueryClient()
    const mutation = useMutation(deleteBook, {
        onSuccess: (data) => {
            queryClient.setQueryData(['books', userId], data)
        }
    })

    return (
        <div data-testid="book-list">
            <div className="flex justify-end px-4 sm:px-6">
                <Button
                    className="mb-6 flex"
                    data-testid="back-button"
                    template="primary"
                    onClick={props.clickHandlerBack}
                >
                    <Svg icon="back" />
                    <span className="ml-2">Back</span>
                </Button>
            </div>
            <div className="flex justify-between bg-gray-200 px-4 py-5 sm:gap-4 sm:px-6 md:rounded-t-lg">
                <div className="flex items-center">
                    <span className="mr-2 md:mr-6">
                        <Svg icon="library" />
                    </span>
                    <span className="hidden text-lg font-bold text-gray-900 md:block">
                        {props.title}
                    </span>
                </div>
                <div className="grow">
                    <Input
                        template="text"
                        data-testid="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search"
                    />
                </div>
                <div className=" ml-2 flex items-center justify-end">
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
                            className={`flex justify-between px-4 py-5 sm:gap-4 sm:px-6 ${
                                i & 1 ? 'bg-white' : 'bg-gray-50'
                            }`}
                        >
                            <div className="flex items-center">
                                <span className={`mr-6 ${bookStatusColour}`}>
                                    <Svg icon="bookmark" />
                                </span>
                                <span className="font-medium text-gray-800">
                                    {book.title}
                                </span>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    data-testid="book-list-read"
                                    template="secondary"
                                    onClick={() => {
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
                                        data-testid="book-list-delete"
                                        template="svgDelete"
                                        className="ml-2"
                                        onClick={() => {
                                            setBook(book)
                                        }}
                                    >
                                        <Svg icon="delete" />
                                    </Button>
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
