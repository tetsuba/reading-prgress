import { useState } from 'react'
import { useSelector } from 'react-redux'
import { userIdSelector } from '../../store/user/userSelectors'
import { useQuery } from 'react-query'
import { getSightWords } from '../../lib/service'

// COMPONENTS
import Header from '../../Components/Header/Header'
import Input from '../../Components/Form/Input'
import HeatMap from '../../Components/HeatMap/HeatMap'

export default function SightWords() {
    const userId = useSelector(userIdSelector)
    const [search, setSearch] = useState('')
    const { data, isSuccess } = useQuery(['sightWords', userId], getSightWords)

    return (
        <>
            <Header text="Sight Words" />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div>
                        <Input
                            dataTestId="search"
                            value={search}
                            onChangeHandler={setSearch}
                            type="text"
                            placeholder="Search"
                        />
                    </div>
                    <div className="px-4 sm:px-0">
                        {isSuccess && (
                            <>
                                <HeatMap
                                    color="red"
                                    words={data.data.sightWordsReadWrong}
                                    search={search}
                                >
                                    Sight Words Read Incorrectly
                                </HeatMap>
                                <HeatMap
                                    color="blue"
                                    words={data.data.sightWordsReadInBooks}
                                    search={search}
                                >
                                    Sight Words Read In Books
                                </HeatMap>
                                <HeatMap
                                    color="green"
                                    words={data.data.sightWordsFromBooks}
                                    search={search}
                                >
                                    Sight Words In Books
                                </HeatMap>
                                <HeatMap
                                    color="none"
                                    words={data.data.sightWordsNotInBooks}
                                    search={search}
                                >
                                    Sight Words Not Available In Books
                                </HeatMap>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}
