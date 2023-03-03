import {
    render,
    fireEvent,
    screen,
    waitFor,
    waitForElementToBeRemoved
} from '@testing-library/react'
import Home from '../Home'
import {
    WrapperWithRouter,
    WrapperWith_Store_Query_Router
} from '../../vitest-setup'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...(actual as object),
        useNavigate: () => mockNavigate
    }
})

describe('Home', () => {
    describe('@Render', () => {
        test('should render first load', () => {
            const { asFragment } = render(
                <WrapperWithRouter pathname="/">
                    <Home />
                </WrapperWithRouter>
            )
            expect(asFragment()).toMatchSnapshot()
        })

        test('should open and close login modal', async () => {
            render(
                <WrapperWith_Store_Query_Router pathname="/">
                    <Home />
                </WrapperWith_Store_Query_Router>
            )
            fireEvent.click(screen.getByText('Log in'))
            await waitFor(() => expect(screen.getByTestId('login-view')))
            fireEvent.click(screen.getByTestId('modal-close'))
            expect(screen.queryByTestId('login-view')).toBeNull()
        })

        test('clicking on the registration button', async () => {
            render(
                <WrapperWithRouter pathname="/">
                    <Home />
                </WrapperWithRouter>
            )
            fireEvent.click(screen.getByText(/^Register/))
            expect(mockNavigate).toHaveBeenCalled()
        })
    })
})
