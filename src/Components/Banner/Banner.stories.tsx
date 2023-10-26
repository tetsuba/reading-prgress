import type { Meta, StoryObj } from '@storybook/react'
import Banner from './Banner'
/**
 * Displays a banner showing the last book read and is color-coded based on
 * words length.
 */
const meta = {
    title: 'COMPONENTS/Banner',
    component: Banner,
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
            title: 'Book Title'
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
            title: 'Book Title'
        }
    }
}
