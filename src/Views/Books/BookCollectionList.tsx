import Svg from '../../Components/Svg/Svg'
import Button from '../../Components/Button/Button'
import BookList, { BookTypes } from './BookList'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { viewBooksSelector } from '../../store/view/viewSelectors'
import { updateViewBookCollection } from '../../store/view/viewSlice'

type CollectionTypes = {
    id: string
    title: string
    description: string
    books: BookTypes[]
}

type PropTypes = {
    collections: CollectionTypes[]
}

export default function BookCollectionList(props: PropTypes) {
    const dispatch = useDispatch()
    const viewBooks = useSelector(viewBooksSelector)

    useEffect(() => {
        if (viewBooks.collection) {
            props.collections.forEach((collection) => {
                if (collection.id === viewBooks.collection.id) {
                    dispatch(updateViewBookCollection(collection))
                }
            })
        }
    }, [props.collections])

    return (
        <div data-testid="collection-list">
            {!viewBooks.collection &&
                props.collections.map((collection, i: number) => (
                    <div
                        key={`book-list-${i}`}
                        className={`px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 ${
                            i & 1 ? 'bg-white' : 'bg-gray-50'
                        }`}
                    >
                        <div className="flex items-center">
                            <span className={`mr-6`}>
                                <Svg type="library" />
                            </span>{' '}
                            <span className="font-medium text-gray-800">{collection.title} ({collection.books.length})</span>

                        </div>
                        <div className="flex justify-end">
                            <Button
                                type="button"
                                className="flex"
                                dataTestid="collection-button"
                                template="secondary"
                                clickHandler={() => {
                                    dispatch(
                                        updateViewBookCollection(collection)
                                    )
                                }}
                            >
                                View Books
                                <span className={`ml-2`}>
                                    <Svg type="eye" />
                                </span>
                            </Button>
                        </div>
                    </div>
                ))}

            {viewBooks.collection && (
                <BookList
                    libId={viewBooks.collection.id}
                    title={viewBooks.collection.title}
                    list={viewBooks.collection.books}
                    clickHandlerBack={() =>
                        dispatch(updateViewBookCollection(null))
                    }
                    delete={viewBooks.collection.id === '001'}
                />
            )}
        </div>
    )
}
