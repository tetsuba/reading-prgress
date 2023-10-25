import * as R from 'ramda'
import { useDispatch } from 'react-redux'
import { useState, useMemo } from 'react'

// UTILS
import { filterBooksByTitle, getBooks } from './book-utils'

// STORE
import { updateCurrentCollectionId } from '../../store/current/currentSlice'

// COMPONENTS
import Svg from '../../Components/Svg/Svg'
import Input from '../../Components/Form/Input'
import Loop from '../../Components/Loop/Loop'
import BookRow from '../../Components/Row/BookRow'
import Button from '../../Components/Button/Button'

// TYPES
import { CollectionWithBooksIconTypes } from '../../store/selector.types'

type PropTypes = {
    collection: CollectionWithBooksIconTypes | undefined
}

export default function ListOfBooks(props: PropTypes) {
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const books = useMemo(() => getBooks(props), [props.collection])

    if (R.isNil(props.collection)) return <>loading...</>
    const filteredBooks = filterBooksByTitle(books, search)

    return (
        <div data-testid="book-list">
            <div className="flex justify-end px-4 sm:px-6">
                <Button
                    className="mb-6 flex"
                    data-testid="back-button"
                    icon="back"
                    template="primary"
                    onClick={() => dispatch(updateCurrentCollectionId(null))}
                >
                    <span className="ml-2">Back</span>
                </Button>
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
            </div>
            <Loop array={filteredBooks}>
                <BookRow />
            </Loop>
        </div>
    )
}
