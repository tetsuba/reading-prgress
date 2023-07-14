import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { userIdSelector } from '../../store/user/userSelectors'

// COMPONENTS
import Header from '../../Components/Header/Header'
import HeatMap from '../../Components/HeatMap/HeatMap'
import Banner from '../../Components/Banner/Banner'
import Loading from '../../Components/Loading/Loading'
import Main from '../../Components/Main/Main'
import Display from '../../Components/Dispay/Display'
import Loop from '../../Components/Loop/Loop'
import { getWords } from '../../api/tracker'

type LastBookReadTypes = {
    words: string[]
    date: string
    title: string
}

export default function Dashboard() {
    const userId = useSelector(userIdSelector)
    const { data, isSuccess, isLoading } = useQuery(['words', userId], getWords)

    if (isLoading) {
        return <Loading />
    }
    return (
        <>
            <Header text="Dashboard" />
            <Main>
                <Display value={isSuccess}>
                    <>
                        <Loop array={data?.data.lastBookRead}>
                            <Banner className="mt-4" />
                        </Loop>
                        <HeatMap
                            color="red"
                            words={data?.data.readIncorrectly.oneWeekAgo}
                            search={''}
                        >
                            Words read incorrectly (In the last week)
                        </HeatMap>
                        <HeatMap
                            color="red"
                            words={data?.data.readIncorrectly.oneMonthAgo}
                            search={''}
                        >
                            Words read incorrectly (In the last month)
                        </HeatMap>
                        <HeatMap
                            color="red"
                            words={data?.data.readIncorrectly.history}
                            search={''}
                        >
                            Words read incorrectly (More than a month ago)
                        </HeatMap>
                    </>
                </Display>
            </Main>
        </>
    )
}
