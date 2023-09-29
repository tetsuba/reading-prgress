import {
    render,
    screen,
    fireEvent,
    waitFor,
    waitForElementToBeRemoved
} from '@testing-library/react'
import { WrapperWith_Store_Query_Router } from '../../../vitest-setup'
import Students from '../Students'
import store from '../../../store/store'
import { addStudents } from '../../../store/students/studentsSlice'
import axios from 'axios'
import { Mocked } from 'vitest'

vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

const mockStudents = [
    {
        firstname: 'Alan',
        lastname: 'Ball',
        dob: '202-12-12',
        studentId: 1,
        progress: []
    },
    {
        firstname: 'Bob',
        lastname: 'Ball',
        dob: '202-12-12',
        studentId: 2,
        progress: []
    }
]

mockedAxios.delete.mockResolvedValue({
    data: [mockStudents[1]]
})

describe('Students', () => {
    store.dispatch(addStudents(mockStudents))

    test('should render students', () => {
        const { asFragment } = render(
            <WrapperWith_Store_Query_Router pathname={'/dashboard'}>
                <Students />
            </WrapperWith_Store_Query_Router>
        )
        expect(asFragment()).toMatchSnapshot()
        expect(screen.getAllByTestId('student-delete')).toHaveLength(2)
    })

    test('should delete a student', async () => {
        render(
            <WrapperWith_Store_Query_Router pathname={'/dashboard'}>
                <Students />
            </WrapperWith_Store_Query_Router>
        )
        expect(screen.getAllByTestId('student-delete')).toHaveLength(2)
        fireEvent.click(screen.getAllByTestId('student-delete')[0])
        await waitFor(() => expect(screen.getByTestId('modal-confirmation')))
        fireEvent.click(screen.getByTestId('delete-button'))
        await waitForElementToBeRemoved(() =>
            screen.getByTestId('modal-confirmation')
        )
        expect(screen.getAllByTestId('student-delete')).toHaveLength(1)
    })
    test('should select a student', () => {
        const name = `${mockStudents[0].firstname} ${mockStudents[0].lastname}`
        render(
            <WrapperWith_Store_Query_Router pathname={'/dashboard'}>
                <Students />
            </WrapperWith_Store_Query_Router>
        )
        fireEvent.click(screen.getAllByTestId('select-student')[0])
        expect(store.getState().view.studentId).toEqual(
            mockStudents[1].studentId
        )
    })
})
