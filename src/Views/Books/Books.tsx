import { useSelector } from 'react-redux'
import * as R from 'ramda'

// COMPONENTS
import SubHeader from '../../Components/SubHeader/SubHeader'
import Main from '../../Components/Main/Main'
import Display from '../../Components/Dispay/Display'
import ListOfCollections from './ListOfCollections'
import ListOfBooks from './ListOfBooks'

import {
    booksSelector,
    collectionSelector
} from '../../store/books/booksSelectors'
import { StateCollectionTypes } from '../../store/store.types'

export default function Books() {
    const books = useSelector(booksSelector)
    const collection = useSelector(collectionSelector)

    return (
        <>
            <SubHeader text="Books" />
            <Main>
                <Display value={R.isNil(collection)}>
                    <ListOfCollections collections={books} />
                </Display>
                <Display value={R.not(R.isNil(collection))}>
                    <ListOfBooks
                        collection={collection as StateCollectionTypes}
                    />
                </Display>
            </Main>
        </>
    )
}
