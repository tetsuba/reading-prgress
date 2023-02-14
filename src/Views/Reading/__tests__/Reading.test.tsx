import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'
import { WrapperWith_Store_Query_Router } from '../../../vitest-setup'
import Reading from '../Reading'
import store from '../../../store/store'
import { addBook } from '../../../store/book/bookSlice'
import axios from 'axios'
vi.mock('axios')

const mockHistory = [
    { date: '12/12/12', words: ['This', 'There', 'Their'] },
    { date: '13/12/12', words: ['This', 'story'] }
]

const mockBookData = {
    title: 'mock title',
    story: 'This is a story. There is, a& story. Their is a story.',
    id: 1,
    history: JSON.stringify(mockHistory)
}

describe('Reading', () => {
    describe('store.book', () => {
        test('with initial state', () => {
            render(
                <WrapperWith_Store_Query_Router pathname="/reading">
                    <Reading />
                </WrapperWith_Store_Query_Router>
            )
            expect(screen.queryAllByTestId('sentence-block')).toHaveLength(0)
            expect(screen.getByText('Book:'))
        })
        describe('dispatched with book data', () => {
            beforeEach(() => {
                store.dispatch(addBook(mockBookData))
                render(
                    <WrapperWith_Store_Query_Router pathname="/reading">
                        <Reading />
                    </WrapperWith_Store_Query_Router>
                )
            })
            test('should render 3 sentences and a title', async () => {
                await waitFor(() =>
                    expect(screen.getByText(`Book: ${mockBookData.title}`))
                )
                expect(screen.queryAllByTestId('sentence-block')).toHaveLength(
                    3
                )
            })
            test('clicking on a word in a sentence', () => {
                expect(screen.getByText('This').getAttribute('class')).toEqual(
                    expect.stringContaining('border-gray-100')
                )
                fireEvent.click(screen.getByText('This'))
                expect(screen.getByText('This').getAttribute('class')).toEqual(
                    expect.stringContaining('border-white')
                )
                fireEvent.click(screen.getByText('This'))
                expect(screen.getByText('This').getAttribute('class')).toEqual(
                    expect.stringContaining('border-green-500')
                )
            })
            test('clicking on the show history button', () => {
                expect(screen.queryAllByTestId('sentence-block')).toHaveLength(
                    3
                )
                fireEvent.click(screen.getByTestId('history-button'))
                expect(screen.queryAllByTestId('sentence-block')).toHaveLength(
                    0
                )
                expect(screen.queryAllByTestId('history-block')).toHaveLength(2)
            })
            test('clicking on the complete button in the sentence component', async () => {
                await waitFor(() =>
                    expect(
                        screen.queryAllByTestId('sentence-block')
                    ).toHaveLength(3)
                )
                screen.queryAllByTestId('sentence-block').forEach((ele) => {
                    expect(ele.getAttribute('class')).not.toEqual(
                        expect.stringContaining('hidden')
                    )
                })
                fireEvent.click(screen.queryAllByTestId('sentence-complete')[0])
                expect(
                    screen
                        .queryAllByTestId('sentence-block')[0]
                        .getAttribute('class')
                ).toEqual(expect.stringContaining('hidden'))
                fireEvent.click(screen.queryAllByTestId('sentence-complete')[1])
                expect(
                    screen
                        .queryAllByTestId('sentence-block')[1]
                        .getAttribute('class')
                ).toEqual(expect.stringContaining('hidden'))
            })
            test('completing all sentences', async () => {
                const mockHistoryResponse = mockHistory.concat([
                    { date: '14/12/12', words: [] }
                ])
                const mockResponse = {
                    data: [
                        {
                            ...mockBookData,
                            history: JSON.stringify(mockHistoryResponse)
                        }
                    ]
                }
                // @ts-ignore
                axios.patch.mockResolvedValueOnce(mockResponse)
                await waitFor(() =>
                    expect(
                        screen.queryAllByTestId('sentence-block')
                    ).toHaveLength(3)
                )
                fireEvent.click(screen.getByText('This'))
                fireEvent.click(screen.queryAllByTestId('sentence-complete')[0])
                fireEvent.click(screen.queryAllByTestId('sentence-complete')[1])
                fireEvent.click(screen.queryAllByTestId('sentence-complete')[2])
                await waitFor(() =>
                    expect(
                        screen.queryAllByTestId('sentence-block')
                    ).toHaveLength(0)
                )
                await waitFor(() =>
                    expect(
                        screen.queryAllByTestId('history-block')
                    ).toHaveLength(3)
                )
                expect(screen.getByText('100% Completed'))
                fireEvent.click(screen.getByText('Try again'))
                await waitFor(() =>
                    expect(
                        screen.queryAllByTestId('sentence-block')
                    ).toHaveLength(3)
                )
                await waitFor(() =>
                    expect(
                        screen.queryAllByTestId('history-block')
                    ).toHaveLength(0)
                )
            })
            test('clicking on the speech button and completing and not completing a sentence', async () => {
                fireEvent.click(screen.getByTestId('speech-button'))
                expect(
                    screen.getByTestId('speech-button').getAttribute('class')
                ).toEqual(expect.stringContaining('text-green-500'))

                expect(screen.getByText('This').getAttribute('class')).toEqual(
                    expect.stringContaining('border-green-500')
                )

                const firstSentenceClasses = screen
                    .queryAllByTestId('sentence-block')[0]
                    .getAttribute('class')
                expect(firstSentenceClasses).toEqual(
                    expect.stringContaining('hidden')
                )

                fireEvent.click(screen.getByTestId('speech-button'))
                expect(
                    screen.getByTestId('speech-button').getAttribute('class')
                ).toEqual(expect.stringContaining('text-red-500'))

                fireEvent.click(screen.getByTestId('speech-button'))
                const secondSentenceClasses = screen
                    .queryAllByTestId('sentence-block')[1]
                    .getAttribute('class')
                expect(secondSentenceClasses).not.toEqual(
                    expect.stringContaining('hidden')
                )
                fireEvent.click(screen.getByTestId('speech-button'))
            })
        })
    })
})
