import {
    render,
    screen,
    waitFor,
    fireEvent,
    act,
    waitForElementToBeRemoved
} from '@testing-library/react'
import { WrapperWith_Store_Query_Router } from '../../../vitest-setup'
import { Mocked } from 'vitest'
import Reading from '../Reading'
import store from '../../../store/store'

import axios from 'axios'
import {
    updateCurrentBookId,
    updateCurrentCollectionId,
    updateCurrentStudentId
} from '../../../store/current/currentSlice'
import { studentsMockData } from '../../../../tests/mockData/students'
vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

describe('Reading', () => {
    describe('initial render', () => {
        afterEach(() => {
            act(() => {
                store.dispatch(updateCurrentCollectionId(null))
                store.dispatch(updateCurrentBookId(null))
                store.dispatch(updateCurrentStudentId(null))
            })
        })
        test('book not selected. student not selected ', () => {
            render(
                <WrapperWith_Store_Query_Router pathname="/reading">
                    <Reading />
                </WrapperWith_Store_Query_Router>
            )
            expect(screen.queryAllByTestId('sentence-block')).toHaveLength(0)
        })
        test('book not selected. student selected ', () => {
            store.dispatch(updateCurrentStudentId(1))
            render(
                <WrapperWith_Store_Query_Router pathname="/reading">
                    <Reading />
                </WrapperWith_Store_Query_Router>
            )

            expect(screen.queryAllByTestId('sentence-block')).toHaveLength(0)
        })
        test('book selected. student not selected ', () => {
            store.dispatch(updateCurrentCollectionId('002'))
            store.dispatch(updateCurrentBookId(1))
            render(
                <WrapperWith_Store_Query_Router pathname="/reading">
                    <Reading />
                </WrapperWith_Store_Query_Router>
            )
            expect(screen.queryAllByTestId('sentence-block')).toHaveLength(15)
            expect(screen.getByText('Double Trouble')).exist
        })
        test('book selected. student selected ', () => {
            store.dispatch(updateCurrentCollectionId('002'))
            store.dispatch(updateCurrentBookId(1))
            store.dispatch(updateCurrentStudentId(1))
            render(
                <WrapperWith_Store_Query_Router pathname="/reading">
                    <Reading />
                </WrapperWith_Store_Query_Router>
            )

            expect(screen.queryAllByTestId('sentence-block')).toHaveLength(15)
            expect(screen.getByText('Double Trouble')).exist
        })
    })

    describe('Story', () => {
        beforeEach(() => {
            store.dispatch(updateCurrentCollectionId('002'))
            store.dispatch(updateCurrentBookId(1))
            store.dispatch(updateCurrentStudentId(1))
            render(
                <WrapperWith_Store_Query_Router pathname="/reading">
                    <Reading />
                </WrapperWith_Store_Query_Router>
            )
        })
        afterEach(() => {
            act(() => {
                store.dispatch(updateCurrentCollectionId(null))
                store.dispatch(updateCurrentBookId(null))
                store.dispatch(updateCurrentStudentId(null))
            })
        })
        test('clicking on a word in a sentence', () => {
            const WORD = 'am'
            expect(screen.getAllByText(WORD)[0].getAttribute('class')).toEqual(
                expect.stringContaining('border-gray-100')
            )
            fireEvent.click(screen.getAllByText(WORD)[0])
            expect(screen.getAllByText(WORD)[0].getAttribute('class')).toEqual(
                expect.stringContaining('border-white')
            )
            fireEvent.click(screen.getAllByText(WORD)[0])
            expect(screen.getAllByText(WORD)[0].getAttribute('class')).toEqual(
                expect.stringContaining('border-green-500')
            )
        })
        test('clicking on the show history button', () => {
            fireEvent.click(screen.getByTestId('history-button'))
            expect(screen.queryAllByTestId('sentence-block')).toHaveLength(0)
            expect(screen.queryAllByTestId('history-block')).toHaveLength(5)
        })
        test('completing all sentences with no errors', async () => {
            mockedAxios.patch.mockResolvedValue({
                data: studentsMockData
            })

            fireEvent.click(screen.queryAllByTestId('sentence-complete')[0])
            fireEvent.click(screen.queryAllByTestId('sentence-complete')[0])
            fireEvent.click(screen.queryAllByTestId('sentence-complete')[0])
            fireEvent.click(screen.queryAllByTestId('sentence-complete')[0])
            fireEvent.click(screen.queryAllByTestId('sentence-complete')[0])
            fireEvent.click(screen.queryAllByTestId('sentence-complete')[0])
            fireEvent.click(screen.queryAllByTestId('sentence-complete')[0])
            fireEvent.click(screen.queryAllByTestId('sentence-complete')[0])
            fireEvent.click(screen.queryAllByTestId('sentence-complete')[0])
            fireEvent.click(screen.queryAllByTestId('sentence-complete')[0])
            fireEvent.click(screen.queryAllByTestId('sentence-complete')[0])
            fireEvent.click(screen.queryAllByTestId('sentence-complete')[0])
            fireEvent.click(screen.queryAllByTestId('sentence-complete')[0])
            fireEvent.click(screen.queryAllByTestId('sentence-complete')[0])
            fireEvent.click(screen.queryAllByTestId('sentence-complete')[0])

            const text = 'I read this book 5 times'

            await waitFor(() =>
                expect(screen.getByText(text).textContent).toEqual(text)
            )

            expect(screen.getByText('100% Completed'))
            fireEvent.click(screen.getByTestId('history-back-button'))
            expect(screen.queryByText(text)).toBeNull()
        })
    })
})
