import Svg from '../../Components/Svg/Svg'
import Button from '../../Components/Button/Button'
import BookList, { BookTypes } from './BookList'
import { useEffect, useState } from 'react'

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
    const [showCollections, setShowCollections] = useState(true)
    const [bookCollection, setBookCollection] =
        useState<CollectionTypes | null>(null)

    useEffect(() => {
        if (bookCollection) {
            props.collections.forEach((collection) => {
                if (collection.id === bookCollection.id) {
                    setBookCollection(collection)
                }
            })
        }
    }, [props.collections])

    return (
        <div data-testid="collection-list">
            {showCollections &&
                props.collections.map((collection, i: number) => (
                    <div
                        key={`book-list-${i}`}
                        className={`px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 ${
                            i & 1 ? 'bg-white' : 'bg-gray-50'
                        }`}
                    >
                        <div className="flex items-center text-base font-medium text-gray-800">
                            <span className={`mr-6`}>
                                <Svg type="library" />
                            </span>{' '}
                            {collection.title}
                        </div>
                        <div className="mt-1 flex justify-end text-sm text-gray-900 sm:mt-0">
                            <Button
                                className="flex"
                                dataTestid="collection-button"
                                template="secondary"
                                clickHandler={() => {
                                    setShowCollections(false)
                                    setBookCollection(collection)
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

            {!showCollections && bookCollection && (
                <BookList
                    libId={bookCollection.id}
                    title={bookCollection.title}
                    list={bookCollection.books}
                    clickHandlerBack={() => setShowCollections(true)}
                    delete={bookCollection.id === '001'}
                />
            )}
        </div>
    )
}
