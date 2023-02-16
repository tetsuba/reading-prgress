import { useMutation, useQueryClient } from 'react-query'
import Button from '../../Components/Button/Button'
import { deleteBook } from '../../lib/service'
import { useDispatch, useSelector } from 'react-redux'
import { userIdSelector } from '../../store/user/userSelectors'
import { addBook } from '../../store/book/bookSlice'
import { useNavigate } from 'react-router-dom'
import Modal from '../../Components/Modal/Modal'
import { useState } from 'react'
import Confirmation from '../../Components/Modal/Confirmation'

type BookTypes = {
    story: string
    title: string
    id: number
}

type PropTypes = {
    list: BookTypes[]
}

export default function BookList(props: PropTypes) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [book, setBook] = useState<null | BookTypes>(null)
    const userId = useSelector(userIdSelector)
    const queryClient = useQueryClient()
    const mutation = useMutation(deleteBook, {
        onSuccess: async (data) => {
            queryClient.setQueryData(['books', userId], data)
        }
    })

    return (
        <div data-testid="book-list">
            <div className="rounded-t-lg bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="text-lg font-bold text-gray-900">
                    Book Title
                </div>
            </div>
            {props.list.map((book, i) => (
                <div
                    key={`book-list-${i}`}
                    className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${
                        i & 1 ? 'bg-white' : 'bg-gray-50'
                    }`}
                >
                    <div className="flex items-center text-base font-medium text-gray-800">
                        {book.title}
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0"></div>
                    <div className="mt-1 flex justify-end text-sm text-gray-900 sm:mt-0">
                        <Button
                            dataTestid="book-list-read"
                            template="secondary"
                            clickHandler={() => {
                                dispatch(addBook(book))
                                navigate('/reading')
                            }}
                        >
                            Read
                        </Button>
                        <Button
                            dataTestid="book-list-delete"
                            template="icon"
                            svg="delete"
                            className="ml-2 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                            clickHandler={() => {
                                setBook(book)
                            }}
                        />
                    </div>
                </div>
            ))}
            {book && (
                <Modal>
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
