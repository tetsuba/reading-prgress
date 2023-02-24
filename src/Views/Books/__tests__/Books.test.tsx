import {
    render,
    waitFor,
    screen,
    fireEvent,
    waitForElementToBeRemoved
} from '@testing-library/react'
import { WrapperWith_Store_Query_Router } from '../../../vitest-setup'
import Books from '../Books'
import axios from 'axios'
import { delay } from '../../../lib/utils'
vi.mock('axios')

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
        history: '[{"date":"16/02/2023","words":[]}]'
    },
    {
        title: 'titleBook 2',
        story: 'story 2',
        id: 2,
        history: '[{"date":"16/02/2023","words":["this"]}]'
    }
]

const mockData = {
    data: [
        {
            id: '001',
            title: 'title collection',
            description: 'description',
            books: booksMock
        },
        {
            id: '002',
            title: 'title collection',
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
    test('will render a list of collections', async () => {
        // @ts-ignore
        axios.get.mockResolvedValue(mockData)
        const { asFragment } = render(
            <WrapperWith_Store_Query_Router pathname={'/books'}>
                <Books />
            </WrapperWith_Store_Query_Router>
        )
        await waitFor(() => expect(screen.getByTestId('collection-list')))
        expect(asFragment()).toMatchSnapshot()
    })
    test('opening and closing a collection', async () => {
        // @ts-ignore
        axios.get.mockResolvedValue(mockData)
        const { asFragment } = render(
            <WrapperWith_Store_Query_Router pathname={'/books'}>
                <Books />
            </WrapperWith_Store_Query_Router>
        )
        await waitFor(() => expect(screen.getByTestId('collection-list')))
        fireEvent.click(screen.getAllByTestId('collection-button')[0])
        expect(screen.queryByTestId('book-list')).not.toBeNull()
        fireEvent.click(screen.getByTestId('back-button'))
        expect(screen.queryByTestId('book-list')).toBeNull()
    })
    test('adding a new book', async () => {
        // @ts-ignore
        axios.get.mockResolvedValueOnce(mockData)
        // @ts-ignore
        axios.post.mockResolvedValueOnce(mockDataNewBook)
        const { asFragment } = render(
            <WrapperWith_Store_Query_Router pathname={'/books'}>
                <Books />
            </WrapperWith_Store_Query_Router>
        )
        await waitFor(() => expect(screen.getByTestId('collection-list')))
        fireEvent.click(screen.getAllByTestId('collection-button')[0])
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
    test('deleting a book', async () => {
        // @ts-ignore
        axios.get.mockResolvedValueOnce(mockDataNewBook)
        // @ts-ignore
        axios.delete.mockResolvedValueOnce(mockData)
        const { asFragment } = render(
            <WrapperWith_Store_Query_Router pathname={'/books'}>
                <Books />
            </WrapperWith_Store_Query_Router>
        )
        await waitFor(() => expect(screen.getByTestId('collection-list')))
        fireEvent.click(screen.getAllByTestId('collection-button')[0])
        fireEvent.click(screen.getAllByTestId('book-list-delete')[0])
        expect(screen.getByTestId('modal-confirmation'))
        fireEvent.click(screen.getByTestId('cancel-button'))
        fireEvent.click(screen.getAllByTestId('book-list-delete')[0])
        fireEvent.click(screen.getByTestId('delete-button'))
        await waitFor(() =>
            expect(screen.getAllByText(/titleBook/)).toHaveLength(2)
        )
    })
    test('clicking on read a book', async () => {
        // @ts-ignore
        axios.get.mockResolvedValueOnce(mockData)
        const { asFragment } = render(
            <WrapperWith_Store_Query_Router pathname={'/books'}>
                <Books />
            </WrapperWith_Store_Query_Router>
        )
        await waitFor(() => expect(screen.getByTestId('collection-list')))
        fireEvent.click(screen.getAllByTestId('collection-button')[0])
        fireEvent.click(screen.getAllByTestId('book-list-read')[0])
        await waitFor(() => expect(mockNavigate).toHaveBeenCalled())
    })
    test('will search for a book title', async () => {
        // @ts-ignore
        axios.get.mockResolvedValueOnce(mockData)
        const { asFragment } = render(
            <WrapperWith_Store_Query_Router pathname={'/books'}>
                <Books />
            </WrapperWith_Store_Query_Router>
        )
        await waitFor(() => expect(screen.getByTestId('collection-list')))
        fireEvent.click(screen.getAllByTestId('collection-button')[0])
        fireEvent.change(screen.getByTestId('search'), {
            target: { value: 'titleBook 2' }
        })
        expect(screen.getAllByText(/titleBook/)).toHaveLength(1)
    })
})
