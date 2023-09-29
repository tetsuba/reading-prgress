import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import * as R from 'ramda'

// STORE
import { userIdSelector } from '../../store/user/userSelectors'
import { studentSelector } from '../../store/students/studentsSelectors'
import { updateViewStudentId } from '../../store/view/viewSlice'

// COMPONENTS
import SubHeader from '../../Components/SubHeader/SubHeader'
import HeatMap from '../../Components/HeatMap/HeatMap'
import Banner from '../../Components/Banner/Banner'
import Loading from '../../Components/Loading/Loading'
import Main from '../../Components/Main/Main'
import Display from '../../Components/Dispay/Display'
import Loop from '../../Components/Loop/Loop'
import { getWords } from '../../api/tracker'

import Button from '../../Components/Button/Button'
import RegisterStudent from '../../Components/Modal/RegisterStudent'
import Students from './Students'

export default function Dashboard() {
    const dispatch = useDispatch()
    const userId = useSelector(userIdSelector)
    const student = useSelector(studentSelector)
    const { data, isSuccess, isLoading } = useQuery(['words', userId], getWords)

    console.log('student:', student)

    if (isLoading) {
        return <Loading />
    }
    return (
        <>
            <SubHeader text="Dashboard">
                <>
                    <Display value={student === undefined}>
                        <RegisterStudent />
                    </Display>
                    <Display value={student !== undefined}>
                        <Button
                            data-testid="change-student-button"
                            template="secondary"
                            onClick={() => dispatch(updateViewStudentId(null))}
                        >
                            Change Student
                        </Button>
                    </Display>
                </>
            </SubHeader>
            <Main>
                <Display value={student === undefined}>
                    <Students />
                </Display>
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
