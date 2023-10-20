import { useDispatch, useSelector } from 'react-redux'
import ls from '../../lib/localStorage'

// STORE
import {
    progressWords,
    studentSelector
} from '../../store/students/studentsSelectors'
import { lastBooksRead } from '../../store/books/booksSelectors'
import { updateCurrentStudentId } from '../../store/current/currentSlice'

// COMPONENTS
import SubHeader from '../../Components/SubHeader/SubHeader'
import HeatMap from '../../Components/HeatMap/HeatMap'
import Banner from '../../Components/Banner/Banner'
import Main from '../../Components/Main/Main'
import Display from '../../Components/Dispay/Display'
import Loop from '../../Components/Loop/Loop'

import Button from '../../Components/Button/Button'
import RegisterStudent from '../../Components/Modal/RegisterStudent'
import Students from './Students'
import moment from 'moment/moment'
import { DATE_FORMAT } from '../../store/store.utils'

export default function Dashboard() {
    const dispatch = useDispatch()
    const student = useSelector(studentSelector)
    const lastBooksReadByStudent = useSelector(lastBooksRead)
    const readIncorrectly = useSelector(progressWords)

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
                            onClick={() => {
                                dispatch(updateCurrentStudentId(null))
                                ls.removeStudentId()
                            }}
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
                <Display value={!!readIncorrectly}>
                    <>
                        <Loop array={lastBooksReadByStudent}>
                            <Banner className="mt-4" />
                        </Loop>
                        <HeatMap
                            color="red"
                            words={readIncorrectly?.oneWeekAgo}
                            search={''}
                        >
                            Words read incorrectly (In the last week)
                        </HeatMap>
                        <HeatMap
                            color="red"
                            words={readIncorrectly?.oneMonthAgo}
                            search={''}
                        >
                            Words read incorrectly (In the last month)
                        </HeatMap>
                        <HeatMap
                            color="red"
                            words={readIncorrectly?.history}
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
