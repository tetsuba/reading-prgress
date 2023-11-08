import type { Meta, StoryObj } from '@storybook/react'
import Banner from './Banner'
import { Provider } from 'react-redux'
import store from '../../store/store'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
/**
 * Displays a banner showing the last book read and is color-coded based on
 * words length.
 */
const meta = {
    title: 'COMPONENTS/Banner',
    component: Banner,
    decorators: [
        (story) => (
            <Provider store={store}>
                <BrowserRouter>{story()}</BrowserRouter>
            </Provider>
        )
    ],
    parameters: {
        layout: 'fullscreen'
    },
    tags: ['autodocs'],
    args: {},
    argTypes: {
        className: {
            control: 'text',
            description: 'Add tailwind classes for positioning'
        }
    }
} satisfies Meta<typeof Banner>

export default meta
type Story = StoryObj<typeof meta>

/**
 * If the data.words.length is equal to 0. It will display green and a thumbs up icon.
 */
export const BannerGreen: Story = {
    args: {
        className: '',
        data: {
            completed: true,
            date: '12/12/12',
            title: 'Book Title',
            collectionId: '002',
            bookId: 1
        }
    }
}

/**
 * If the data.words.length is greater than 0. It will display red and a warning icon.
 */
export const BannerRed: Story = {
    args: {
        className: '',
        data: {
            completed: false,
            date: '12/12/12',
            title: 'Book Title',
            collectionId: '002',
            bookId: 1
        }
    }
}
