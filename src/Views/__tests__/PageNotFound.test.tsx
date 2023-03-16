import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import PageNotFound from '../PageNotFound'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...(actual as object),
        useNavigate: () => mockNavigate
    }
})

describe('PageNotFound', () => {
    test('render page and click on go back button', async () => {
        const { asFragment } = render(<PageNotFound />)
        expect(asFragment()).toMatchSnapshot()
        fireEvent.click(screen.getByTestId('go-back-button'))
        await waitFor(() => expect(mockNavigate).toHaveBeenCalled())
    })
})
