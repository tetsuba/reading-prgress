import Header from '../../Components/Header/Header'

import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { userIdSelector } from '../../store/user/userSelectors'
import { getBooks } from '../../lib/service'
import BookCollectionList from './BookCollectionList'

export default function Books() {
    const userId = useSelector(userIdSelector)
    const { data, isSuccess } = useQuery(['books', userId], getBooks)

    return (
        <div>
            <Header text="Books" />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        {isSuccess && (
                            <BookCollectionList collections={data.data} />
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
