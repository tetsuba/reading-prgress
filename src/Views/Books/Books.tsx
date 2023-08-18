import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'
import { userIdSelector } from '../../store/user/userSelectors'
import { viewBooksCollectionSelector } from '../../store/view/viewSelectors'
import { getBooks } from '../../api/book'

// COMPONENTS
import Header from '../../Components/Header/Header'
import Loading from '../../Components/Loading/Loading'
import Main from '../../Components/Main/Main'
import Display from '../../Components/Dispay/Display'
import ListOfCollections from './ListOfCollections'

import ListOfBooks from './ListOfBooks'
import { updateViewBookCollection } from '../../store/view/viewSlice'
import { useEffect } from 'react'

export default function Books() {
    const dispatch = useDispatch()
    const collection = useSelector(viewBooksCollectionSelector)
    const userId = useSelector(userIdSelector)
    const { data, isSuccess, isLoading } = useQuery(['books', userId], getBooks)

    useEffect(() => {
        if (collection) {
            data?.data.forEach((c) => {
                if (collection && c.id === collection.id) {
                    dispatch(updateViewBookCollection(c))
                }
            })
        }
    }, [data?.data])

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Header text="Books" />
            <Main>
                <Display value={isSuccess && R.isNil(collection)}>
                    <ListOfCollections collections={data?.data} />
                </Display>
                <Display value={R.not(R.isNil(collection))}>
                    <ListOfBooks collection={collection} />
                </Display>
            </Main>
        </>
    )
}
