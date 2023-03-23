import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import {
    WrapperWith_Store_Router,
    WrapperWith_Store_Query_Router
} from '../../../vitest-setup'
import Nav from '../Nav'
import store from '../../../store/store'
import { updateUser } from '../../../store/user/userSlice'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...(actual as object),
        useNavigate: () => mockNavigate
    }
})

const mockUser = {
    data: {
        firstName: 'Bob',
        lastName: 'Bob',
        email: 'Bob@Bob.com',
        id: 1
    },
    token: 'MockToken'
}

describe('Nav', () => {
    describe('not authenticated', () => {
        test('clicking on the login button', async () => {
            const { asFragment } = render(
                <WrapperWith_Store_Query_Router pathname="/">
                    <Nav />
                </WrapperWith_Store_Query_Router>
            )
            expect(asFragment()).toMatchSnapshot()
            fireEvent.click(screen.getByText('Log in'))
            await waitFor(() => expect(screen.getByTestId('login-view')))
            fireEvent.click(screen.getByTestId('modal-close'))
            expect(screen.queryByTestId('login-view')).toBeNull()
        })
    })
    describe('authenticated', () => {
        test('clicking on the sign out button [desktop]', async () => {
            store.dispatch(updateUser(mockUser))

            render(
                <WrapperWith_Store_Router pathname="/profile">
                    <Nav />
                </WrapperWith_Store_Router>
            )

            fireEvent.click(screen.getByTestId('user-menu-button'))
            fireEvent.click(screen.getByText('Sign out'))
            expect(screen.queryByTestId('user-menu')).toBeNull()
            await waitFor(() => expect(mockNavigate).toHaveBeenCalled())
        })
        test('clicking on the sign out button [mobile]', async () => {
            store.dispatch(updateUser(mockUser))
            render(
                <WrapperWith_Store_Router pathname="/profile">
                    <Nav />
                </WrapperWith_Store_Router>
            )
            fireEvent.click(screen.getByTestId('mobile-menu-button'))
            fireEvent.click(screen.getByTestId('sign-out-mobile-menu'))
            await waitFor(() => expect(mockNavigate).toHaveBeenCalled())
        })
        test('clicking on a mobile navigation menu link', async () => {
            store.dispatch(updateUser(mockUser))
            render(
                <WrapperWith_Store_Router pathname="/profile">
                    <Nav />
                </WrapperWith_Store_Router>
            )
            fireEvent.click(screen.getByTestId('mobile-menu-button'))
            expect(screen.getByTestId('mobile-nav-menu'))
            fireEvent.click(screen.getAllByTestId('mobile-menu-link')[0])
            expect(screen.queryByTestId('mobile-nav-menu')).toBeNull()
            await waitFor(() => expect(mockNavigate).toHaveBeenCalled())
        })
    })
})
