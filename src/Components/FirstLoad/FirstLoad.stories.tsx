import type { Meta, StoryObj } from '@storybook/react'
import FirstLoad from './FirstLoad'
import store from '../../store/store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            cacheTime: Infinity
        }
    }
})

/**
 * The FirstLoad component is used to handle initial data fetching when the app first loads.
 */
const meta = {
    title: 'COMP-UI-NONE/FirstLoad',
    component: FirstLoad,
    decorators: [
        (story) => (
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>{story()}</BrowserRouter>
                </QueryClientProvider>
            </Provider>
        )
    ],
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    args: {},
    argTypes: {}
} satisfies Meta<typeof FirstLoad>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
    children: <h1>Page to view</h1>
}
