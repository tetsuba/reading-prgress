import { useSelector } from 'react-redux'
import * as R from 'ramda'

// COMPONENTS
import SubHeader from '../../Components/SubHeader/SubHeader'
import Main from '../../Components/Main/Main'
import Display from '../../Components/Dispay/Display'
import ListOfCollections from './ListOfCollections'
import ListOfBooks from './ListOfBooks'

import {
    collectionsSelector,
    collectionWithBooksIconSelector
} from '../../store/books/booksSelectors'
import ModalMessage from '../../Components/Modal/ModalMessage'
import { viewBooksShowMessageSelector } from '../../store/view/viewSelectors'

export default function Books() {
    const collectionWithBooksIcon = useSelector(collectionWithBooksIconSelector)
    const collections = useSelector(collectionsSelector)
    const showMessage = useSelector(viewBooksShowMessageSelector)

    return (
        <>
            <SubHeader text="Books" />
            <Main>
                <Display value={R.isNil(collectionWithBooksIcon)}>
                    <ListOfCollections collections={collections} />
                </Display>
                <Display value={R.not(R.isNil(collectionWithBooksIcon))}>
                    <ListOfBooks collection={collectionWithBooksIcon} />
                </Display>
            </Main>
            <Display value={showMessage}>
                <ModalMessage />
            </Display>
        </>
    )
}
