import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { WrapperWith_Store_Query_Router } from '../../../vitest-setup'
import useUpdateStudentProgress from '../useUpdateStudentProgress'
import { useState } from 'react'
import { Mocked } from 'vitest'
import axios from 'axios'
import { studentsMockData } from '../../../../tests/mockData/students'
import store from '../../../store/store'
import {
    updateCurrentBookId,
    updateCurrentCollectionId,
    updateCurrentStudentId
} from '../../../store/current/currentSlice'
import { addStudents } from '../../../store/students/studentsSlice'
vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

const mockStory = [
    [{ word: 'first', status: '' }],
    [{ word: 'second', status: '' }],
    [{ word: 'third', status: '' }]
]
function TestCustomState() {
    const [showHistory, setShowHistory] = useState(false)
    const updateStudentProgress = useUpdateStudentProgress(setShowHistory)
    return (
        <button
            onClick={() => {
                updateStudentProgress(mockStory)
            }}
        >
            click here
        </button>
    )
}

const firstProgressUpdate = {
    collectionId: '002',
    bookId: 1,
    history: [{ date: '12/12/12', words: [] }]
}
const secondProgressUpdate = {
    collectionId: '002',
    bookId: 1,
    history: [{ date: '24/12/12', words: ['word'] }]
}
const newProgressBook = {
    collectionId: '002',
    bookId: 2,
    history: [{ date: '24/12/12', words: ['word'] }]
}

describe('useUpdateStudentProgress', () => {
    store.dispatch(updateCurrentStudentId(2))
    store.dispatch(updateCurrentCollectionId('002'))
    store.dispatch(updateCurrentBookId(1))

    beforeEach(() => {
        render(
            <WrapperWith_Store_Query_Router pathname="/reading">
                <TestCustomState />
            </WrapperWith_Store_Query_Router>
        )
    })

    test('should add the first progress book', async () => {
        mockedAxios.patch.mockResolvedValue({
            data: [
                studentsMockData[0],
                {
                    ...studentsMockData[1],
                    progress: [firstProgressUpdate]
                }
            ]
        })
        expect(store.getState().students[1].progress).toBeNull()
        fireEvent.click(screen.getByText('click here'))
        await waitFor(() =>
            expect(store.getState().students[1].progress).toEqual([
                firstProgressUpdate
            ])
        )
    })
    test('should update a progress book', async () => {
        act(() => {
            store.dispatch(
                addStudents([
                    studentsMockData[0],
                    {
                        ...studentsMockData[1],
                        progress: [firstProgressUpdate]
                    }
                ])
            )
        })
        mockedAxios.patch.mockResolvedValue({
            data: [
                studentsMockData[0],
                {
                    ...studentsMockData[1],
                    progress: [firstProgressUpdate, secondProgressUpdate]
                }
            ]
        })
        fireEvent.click(screen.getByText('click here'))
        await waitFor(() =>
            expect(store.getState().students[1].progress).toEqual([
                firstProgressUpdate,
                secondProgressUpdate
            ])
        )
    })
    test('should add a new progress book', async () => {
        act(() => {
            store.dispatch(
                addStudents([
                    studentsMockData[0],
                    {
                        ...studentsMockData[1],
                        progress: [firstProgressUpdate]
                    }
                ])
            )
            store.dispatch(updateCurrentBookId(2))
        })
        mockedAxios.patch.mockResolvedValue({
            data: [
                studentsMockData[0],
                {
                    ...studentsMockData[1],
                    progress: [firstProgressUpdate, newProgressBook]
                }
            ]
        })
        fireEvent.click(screen.getByText('click here'))
        await waitFor(() =>
            expect(store.getState().students[1].progress).toEqual([
                firstProgressUpdate,
                newProgressBook
            ])
        )
    })
})
