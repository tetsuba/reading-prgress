import * as R from 'ramda'
import { updateViewBookCollection } from '../../store/view/viewSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useMemo } from 'react'
import { ApiBookTypes, ApiCollectionTypes } from '../../api/api-types'
import { userIdSelector } from '../../store/user/userSelectors'
import { useMutation, useQueryClient } from 'react-query'
import { filterBooksByTitle, getBooks } from './book-utils'
import { deleteBook } from '../../api/book'

// COMPONENTS
import { BackToCollectionButton } from '../../Components/Button/Buttons'
import Svg from '../../Components/Svg/Svg'
import Input from '../../Components/Form/Input'
import Display from '../../Components/Dispay/Display'
import AddBook from './AddBook'
import Modal from '../../Components/Modal/Modal'
import Confirmation from '../../Components/Modal/Confirmation'
import Loop from '../../Components/Loop/Loop'
import BookRow from './BookRow'

type PropTypes = {
    collection: ApiCollectionTypes | null
}

export default function ListOfBooks(props: PropTypes) {
    const dispatch = useDispatch()
    // TODO: rename to deleteBookData or something like that
    const [book, setBook] = useState<null | ApiBookTypes>(null)
    const [search, setSearch] = useState('')
    const userId = useSelector(userIdSelector)
    const queryClient = useQueryClient()
    const mutation = useMutation(deleteBook, {
        onSuccess: (data) => {
            queryClient.setQueryData(['books', userId], data)
        }
    })

    if (R.isNil(props.collection)) return <>loading...</>
    const books = useMemo(() => getBooks(props), [props.collection])
    const filteredBooks = filterBooksByTitle(books, search)

    return (
        <div data-testid="book-list">
            <div className="flex justify-end px-4 sm:px-6">
                <BackToCollectionButton
                    onClick={() => dispatch(updateViewBookCollection(null))}
                />
            </div>
            <div className="flex justify-between bg-gray-200 px-4 py-5 sm:gap-4 sm:px-6 md:rounded-t-lg">
                <div className="flex items-center">
                    <span className="mr-2 md:mr-6">
                        <Svg icon="library" />
                    </span>
                    <span className="hidden text-lg font-bold text-gray-900 md:block">
                        {props.collection.title}
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
                    <Display value={props.collection.id === '001'}>
                        <AddBook />
                    </Display>
                </div>
            </div>
            <Loop
                array={filteredBooks}
                collectionId={props.collection.id}
                deleteBook={setBook}
            >
                <BookRow />
            </Loop>
            <Display value={R.isNotNil(book)}>
                <Modal className="max-w-md">
                    <Confirmation
                        bookTitle={book ? book.title : ''}
                        clickHandlerCancel={() => setBook(null)}
                        clickHandlerDelete={() => {
                            if (book) {
                                mutation.mutate(book.id)
                                setBook(null)
                            }
                        }}
                    />
                </Modal>
            </Display>
        </div>
    )
}
