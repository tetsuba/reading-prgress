import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { userIdSelector } from '../../store/user/userSelectors'
import { getWords } from '../../lib/service'

// COMPONENTS
import Header from '../../Components/Header/Header'
import HeatMap from '../../Components/HeatMap/HeatMap'
import Banner from '../../Components/Banner/Banner'
import Loading from '../../Components/Loading/Loading'

type LastBookReadTypes = {
    words: string[]
    date: string
    title: string
}

export default function Dashboard() {
    const userId = useSelector(userIdSelector)
    const { data, isSuccess, isLoading } = useQuery(['words', userId], getWords)

    const getColor = (book: LastBookReadTypes) =>
        book.words.length ? 'red' : 'green'

    if (isLoading) {
        return <Loading />
    }
    return (
        <>
            <Header text="Dashboard" />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="px-4 sm:px-0">
                        {isSuccess && (
                            <>
                                <div>
                                    {data.data.lastBookRead.map(
                                        (
                                            book: LastBookReadTypes,
                                            i: number
                                        ) => (
                                            <Banner
                                                key={`banner-${i}`}
                                                className="mt-4"
                                                color={getColor(book)}
                                            >
                                                [{book.date}] {book.title}{' '}
                                            </Banner>
                                        )
                                    )}
                                </div>
                                <HeatMap
                                    color="red"
                                    words={data.data.readIncorrectly.oneWeekAgo}
                                    search={''}
                                >
                                    Words read incorrectly (In the last week)
                                </HeatMap>
                                <HeatMap
                                    color="red"
                                    words={
                                        data.data.readIncorrectly.oneMonthAgo
                                    }
                                    search={''}
                                >
                                    Words read incorrectly (In the last month)
                                </HeatMap>
                                <HeatMap
                                    color="red"
                                    words={data.data.readIncorrectly.history}
                                    search={''}
                                >
                                    Words read incorrectly (More than a month
                                    ago)
                                </HeatMap>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}
