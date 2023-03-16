import { Mocked } from 'vitest'
import {
    act,
    render,
    waitFor,
    screen,
    fireEvent,
    waitForElementToBeRemoved
} from '@testing-library/react'
import { WrapperWith_Store_Query_Router } from '../../../vitest-setup'
import Books from '../Books'
import { delay } from '../../../lib/utils'
import { updateViewBookCollection } from '../../../store/view/viewSlice'
import store from '../../../store/store'

import axios from 'axios'
vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
    ...(vi.importActual('react-router-dom') as object),
    useNavigate: () => mockNavigate
}))

const booksMock = [
    {
        title: 'titleBook 1',
        story: 'story 1',
        id: 1,
        history: null
    },
    {
        title: 'titleBook 2',
        story: 'story 2',
        id: 2,
        history: [{ date: '16/02/2023', words: ['this'] }]
    }
]

const mockData = {
    data: [
        {
            id: '001',
            title: 'title collection 1',
            description: 'description',
            books: booksMock
        },
        {
            id: '002',
            title: 'title collection 2',
            description: 'description',
            books: booksMock
        }
    ]
}

const mockDataNewBook = {
    data: [
        {
            id: '001',
            title: 'title',
            description: 'description',
            books: [
                ...booksMock,
                {
                    title: 'titleBook 3',
                    story: 'story 3',
                    id: 2,
                    history: null
                }
            ]
        },
        {
            id: '002',
            title: 'title',
            description: 'description',
            books: booksMock
        }
    ]
}

const mockEventTarget = {
    target: {
        title: { value: 'title3' },
        story: { value: 'story3' },
        difficulty: { value: '3' }
    }
}

describe('Books View', () => {
    beforeEach(async () => {
        // @ts-ignore
        mockedAxios.get.mockResolvedValue(mockData)
        render(
            <WrapperWith_Store_Query_Router pathname={'/books'}>
                <Books />
            </WrapperWith_Store_Query_Router>
        )
        await waitFor(() => expect(screen.getByTestId('collection-list')))
    })
    afterEach(() => {
        act(() => {
            store.dispatch(updateViewBookCollection(null))
        })
    })
    test('opening and closing a collection', async () => {
        fireEvent.click(screen.queryAllByTestId('collection-button')[0])
        await waitFor(() =>
            expect(screen.getByTestId('book-list')).not.toBeNull()
        )
        fireEvent.click(screen.getByTestId('back-button'))
        expect(screen.queryByTestId('book-list')).toBeNull()
    })
    test('adding a new book', async () => {
        mockedAxios.post.mockResolvedValueOnce(mockDataNewBook)

        fireEvent.click(screen.getAllByTestId('collection-button')[0])
        await waitFor(() =>
            expect(screen.getByTestId('book-list')).not.toBeNull()
        )
        fireEvent.click(screen.getByText('Add Book'))
        expect(screen.getByTestId('register-book-form'))
        fireEvent.submit(
            screen.getByTestId('register-book-form'),
            mockEventTarget
        )
        await waitForElementToBeRemoved(() =>
            expect(screen.getByTestId('register-book-form'))
        )
        await waitFor(() =>
            expect(screen.getAllByText(/titleBook/)).toHaveLength(3)
        )
    })
    test('clicking on read a book', async () => {
        fireEvent.click(screen.getAllByTestId('collection-button')[0])
        await waitFor(() =>
            expect(screen.getByTestId('book-list')).not.toBeNull()
        )
        fireEvent.click(screen.getAllByTestId('book-list-read')[0])
        await waitFor(() => expect(mockNavigate).toHaveBeenCalled())
    })
    test('will search for a book title', async () => {
        fireEvent.click(screen.getAllByTestId('collection-button')[0])
        await waitFor(() =>
            expect(screen.getByTestId('book-list')).not.toBeNull()
        )
        fireEvent.change(screen.getByTestId('search'), {
            target: { value: 'titleBook 2' }
        })
        expect(screen.getAllByText(/titleBook/)).toHaveLength(1)
    })
    test('deleting a book', async () => {
        mockedAxios.get.mockResolvedValueOnce(mockDataNewBook)
        mockedAxios.delete.mockResolvedValueOnce(mockData)
        fireEvent.click(screen.getAllByTestId('collection-button')[0])
        await waitFor(() =>
            expect(screen.getByTestId('book-list')).not.toBeNull()
        )
        fireEvent.click(screen.getAllByTestId('book-list-delete')[0])
        expect(screen.getByTestId('modal-confirmation'))
        fireEvent.click(screen.getByTestId('cancel-button'))
        fireEvent.click(screen.getAllByTestId('book-list-delete')[0])
        fireEvent.click(screen.getByTestId('delete-button'))
        await waitFor(() =>
            expect(screen.getAllByText(/titleBook/)).toHaveLength(2)
        )
    })
})
