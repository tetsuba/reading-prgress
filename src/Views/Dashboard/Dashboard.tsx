import Header from '../../Components/Header/Header'
import { useSelector } from 'react-redux'
import { userIdSelector } from '../../store/user/userSelectors'
import { useQuery } from 'react-query'
import { getWords } from '../../lib/service'
import WordHeatMap, { WordHeatMapTypes } from './WordHeatMap'

export default function Dashboard() {
    const userId = useSelector(userIdSelector)
    const { data, isSuccess } = useQuery(['words', userId], getWords)
    return (
        <>
            <Header text="Dashboard" />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="min-h-96 inline-flex flex-wrap items-center justify-center rounded-lg border-4 border-dashed border-gray-200 p-2">
                            {isSuccess &&
                                data.data.map(
                                    (obj: WordHeatMapTypes, i: number) => (
                                        <WordHeatMap
                                            key={`word-${i}`}
                                            word={obj.word}
                                            index={obj.index}
                                        />
                                    )
                                )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
