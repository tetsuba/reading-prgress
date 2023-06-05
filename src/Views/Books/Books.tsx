import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { userIdSelector } from '../../store/user/userSelectors'
import { getBooks } from '../../lib/service'

// COMPONENTS
import Header from '../../Components/Header/Header'
import BookCollectionList from './BookCollectionList'
import Loading from '../../Components/Loading/Loading'
import Main from '../../Components/Main/Main'

export default function Books() {
    const userId = useSelector(userIdSelector)
    const { data, isSuccess, isLoading } = useQuery(['books', userId], getBooks)

    if (isLoading) {
        return <Loading />
    }
    return (
        <>
            <Header text="Books" />
            <Main>
                <>
                    {isSuccess && (
                        <BookCollectionList collections={data.data} />
                    )}
                </>
            </Main>
        </>
    )
}
