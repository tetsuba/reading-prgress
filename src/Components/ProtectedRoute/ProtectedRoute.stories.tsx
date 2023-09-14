import type { Meta, StoryObj } from '@storybook/react'
import ProtectedRoute from './ProtectedRoute'
import { StateUserTypes } from '../../store/store-types'
import { Provider } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../../App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { initialState } from '../../store/user/userSlice'

const meta = {
    title: 'COMP-UI-NONE/ProtectedRoute',
    component: ProtectedRoute,
    parameters: {
        layout: 'fullwidth'
    },
    args: {},
    argTypes: {}
} satisfies Meta<typeof ProtectedRoute>

export default meta
type Story = StoryObj<typeof meta>

const Home = () => <p>Redirected to home page</p>
const Dashboard = () => <p>Dashboard page</p>

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
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="dashboard" element={<p>This is working</p>} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </Provider>
)

export const Default: Story = {
    parameters: {
        docs: {
            story: {
                inline: false,
                iframeHeight: 700
            }
        }
    },
    args: {
        children: <Dashboard />
    },
    decorators: [
        (story) => (
            <Wrapper userState={{ ...initialState, token: '32432424324234' }}>
                {story()}
            </Wrapper>
        )
    ]
}
