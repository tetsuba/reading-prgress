import Header from '../../Components/Header/Header'
import { useSelector } from 'react-redux'
import { userIdSelector } from '../../store/user/userSelectors'
import { useQuery } from 'react-query'
import { getWords } from '../../lib/service'
import HeatMap from '../../Components/HeatMap/HeatMap'

export default function Dashboard() {
    const userId = useSelector(userIdSelector)
    const { data, isSuccess } = useQuery(['words', userId], getWords)
    return (
        <>
            <Header text="Dashboard" />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        {isSuccess && (
                            <HeatMap color="red" words={data.data} search={''}>
                                Words read incorrectly
                            </HeatMap>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}
