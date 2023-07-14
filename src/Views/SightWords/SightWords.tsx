import { useState } from 'react'
import { useSelector } from 'react-redux'
import { userIdSelector } from '../../store/user/userSelectors'
import { useQuery } from 'react-query'
import { getSightWords } from '../../api/sightWords'

// COMPONENTS
import Header from '../../Components/Header/Header'
import Input from '../../Components/Form/Input'
import HeatMap from '../../Components/HeatMap/HeatMap'
import Loading from '../../Components/Loading/Loading'
import Main from '../../Components/Main/Main'
import Display from '../../Components/Dispay/Display'

export default function SightWords() {
    const userId = useSelector(userIdSelector)
    const [search, setSearch] = useState('')
    const { data, isSuccess, isLoading } = useQuery(
        ['sightWords', userId],
        getSightWords
    )

    if (isLoading) {
        return <Loading />
    }
    return (
        <>
            <Header text="Sight Words" />
            <Main>
                <>
                    <Input
                        template="text"
                        data-testid="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search"
                    />
                    <Display value={isSuccess}>
                        <>
                            <HeatMap
                                color="red"
                                words={data?.data.sightWordsReadWrong}
                                search={search}
                            >
                                Sight Words Read Incorrectly
                            </HeatMap>
                            <HeatMap
                                color="blue"
                                words={data?.data.sightWordsReadInBooks}
                                search={search}
                            >
                                Sight Words Read In Books
                            </HeatMap>
                            <HeatMap
                                color="green"
                                words={data?.data.sightWordsFromBooks}
                                search={search}
                            >
                                Sight Words In Books
                            </HeatMap>
                            <HeatMap
                                color="none"
                                words={data?.data.sightWordsNotInBooks}
                                search={search}
                            >
                                Sight Words Not Available In Books
                            </HeatMap>
                        </>
                    </Display>
                </>
            </Main>
        </>
    )
}
