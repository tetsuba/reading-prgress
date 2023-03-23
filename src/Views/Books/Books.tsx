import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { userIdSelector } from '../../store/user/userSelectors'
import { getBooks } from '../../lib/service'

// COMPONENTS
import Header from '../../Components/Header/Header'
import BookCollectionList from './BookCollectionList'
import Loading from '../../Components/Loading/Loading'

export default function Books() {
    const userId = useSelector(userIdSelector)
    const { data, isSuccess, isLoading } = useQuery(['books', userId], getBooks)

    if (isLoading) {
        return <Loading />
    }
    return (
        <>
            <Header text="Books" />
            <main>
                <div className="mx-auto max-w-7xl py-6 md:px-4">
                    {isSuccess && (
                        <BookCollectionList collections={data.data} />
                    )}
                </div>
            </main>
        </>
    )
}
