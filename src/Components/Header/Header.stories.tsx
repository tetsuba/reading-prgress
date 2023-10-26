import type { Meta, StoryObj } from '@storybook/react'
import Header from './Header'
import { Provider } from 'react-redux'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { queryClient } from '../../App'
import { updateUser } from '../../store/user/userSlice'
import store from '../../store/store'

const meta = {
    title: 'Layout/Header',
    component: Header,
    parameters: {
        layout: 'fullscreen'
    },
    args: {},
    argTypes: {}
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

// TODO: Create a new store mocking the data required

const Wrapper = ({
    authenticated,
    children
}: {
    authenticated: boolean
    children: JSX.Element
}) => {
    const user = { firstName: 'John', lastName: 'Doe', email: '<EMAIL>', id: 1 }
    if (authenticated) {
        store.dispatch(updateUser({ token: '123456', user }))
    } else {
        store.dispatch(updateUser({ token: '', user }))
    }
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>{children}</BrowserRouter>
            </QueryClientProvider>
        </Provider>
    )
}

export const UserLoggedOut: Story = {
    args: {},
    decorators: [(story) => <Wrapper authenticated={false}>{story()}</Wrapper>]
}

/**
 * Does this work
 */
export const UserLoggedIn: Story = {
    args: {},
    decorators: [(story) => <Wrapper authenticated={true}>{story()}</Wrapper>]
}
