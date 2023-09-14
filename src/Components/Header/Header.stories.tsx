import type { Meta, StoryObj } from '@storybook/react'
import Header from './Header'
import { Provider } from 'react-redux'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { queryClient } from '../../App'
import { initialState } from '../../store/user/userSlice'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { StateUserTypes } from '../../store/store-types'

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
    userState,
    children
}: {
    userState: StateUserTypes
    children: JSX.Element
}) => (
    <Provider
        store={configureStore({
            reducer: {
                user: createSlice({
                    name: 'user',
                    initialState: userState,
                    reducers: {}
                }).reducer
            }
        })}
    >
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>{children}</BrowserRouter>
        </QueryClientProvider>
    </Provider>
)

export const UserLoggedOut: Story = {
    args: {},
    decorators: [
        (story) => <Wrapper userState={initialState}>{story()}</Wrapper>
    ]
}

/**
 * Does this work
 */
export const UserLoggedIn: Story = {
    args: {},
    decorators: [
        (story) => (
            <Wrapper userState={{ ...initialState, token: '123456' }}>
                {story()}
            </Wrapper>
        )
    ]
}
