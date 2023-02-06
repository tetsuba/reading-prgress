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

const mockData = {
    data: [
        { title: 'title 1', story: 'story 1', id: 1 },
        { title: 'title 2', story: 'story 2', id: 2 }
    ]
}

const mockDataNewBook = {
    data: [
        { title: 'title 1', story: 'story 1', id: 1 },
        { title: 'title 2', story: 'story 2', id: 2 },
        { title: 'title 3', story: 'story 3', id: 3 }
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
    test('will render a list of books', async () => {
        // @ts-ignore
        axios.get.mockResolvedValue(mockData)
        const { asFragment } = render(
            <WrapperWith_Store_Query_Router pathname={'/books'}>
                <Books />
            </WrapperWith_Store_Query_Router>
        )
        await waitFor(() => expect(screen.getByTestId('book-list')))
        expect(asFragment()).toMatchSnapshot()
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
        await waitFor(() =>
            expect(screen.getAllByText(/title/)).toHaveLength(2)
        )
        fireEvent.click(screen.getByText('Add New Book'))
        await waitFor(() => expect(screen.getByTestId('register-book-form')))
        fireEvent.submit(
            screen.getByTestId('register-book-form'),
            mockEventTarget
        )
        waitForElementToBeRemoved(() =>
            expect(screen.getByTestId('register-book-form'))
        )
        await waitFor(() =>
            expect(screen.getAllByText(/title/)).toHaveLength(3)
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
        await waitFor(() =>
            expect(screen.getAllByText(/title/)).toHaveLength(3)
        )
        fireEvent.click(screen.getAllByTestId('book-list-delete')[0])
        await waitFor(() =>
            expect(screen.getAllByText(/title/)).toHaveLength(2)
        )
    })
    test('clicking on read a book', async () => {
        // @ts-ignore
        axios.get.mockResolvedValueOnce(mockDataNewBook)
        // @ts-ignore
        axios.delete.mockResolvedValueOnce(mockData)
        const { asFragment } = render(
            <WrapperWith_Store_Query_Router pathname={'/books'}>
                <Books />
            </WrapperWith_Store_Query_Router>
        )
        await waitFor(() =>
            expect(screen.getAllByText(/title/)).toHaveLength(3)
        )
        fireEvent.click(screen.getAllByTestId('book-list-read')[0])
        await waitFor(() => expect(mockNavigate).toHaveBeenCalled())
    })
})
