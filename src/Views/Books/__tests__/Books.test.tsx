import { act, render, waitFor, screen, fireEvent } from '@testing-library/react'
import { WrapperWith_Store_Query_Router } from '../../../vitest-setup'
import Books from '../Books'
import store from '../../../store/store'
import {
    updateCurrentBookId,
    updateCurrentCollectionId,
    updateCurrentStudentId
} from '../../../store/current/currentSlice'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
    ...(vi.importActual('react-router-dom') as object),
    useNavigate: () => mockNavigate
}))

describe('Books View', () => {
    beforeEach(() => {
        store.dispatch(updateCurrentStudentId(1))
        render(
            <WrapperWith_Store_Query_Router pathname={'/books'}>
                <Books />
            </WrapperWith_Store_Query_Router>
        )
        afterEach(() => {
            store.dispatch(updateCurrentBookId(null))
            store.dispatch(updateCurrentCollectionId(null))
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
    test('clicking on read a book', async () => {
        fireEvent.click(screen.getAllByTestId('collection-button')[0])
        await waitFor(() =>
            expect(screen.getByTestId('book-list')).not.toBeNull()
        )
        fireEvent.click(screen.getAllByTestId('book-list-read')[0])
        await waitFor(() => expect(mockNavigate).toHaveBeenCalled())
    })
    test('will search for a book title', async () => {
        fireEvent.click(screen.getAllByTestId('collection-button')[1])
        await waitFor(() =>
            expect(screen.getByTestId('book-list')).not.toBeNull()
        )
        fireEvent.change(screen.getByTestId('search'), {
            target: { value: 'Pirate Pat' }
        })
        expect(screen.getAllByText(/Pirate Pat/)).toHaveLength(1)
    })
})
