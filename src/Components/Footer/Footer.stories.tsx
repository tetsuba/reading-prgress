import type { Meta, StoryObj } from '@storybook/react'
import Footer from './Footer'

/**
 * Display a footer for all pages
 */
const meta = {
    title: 'Layout/Footer',
    component: Footer,
    parameters: {
        layout: 'fullscreen'
    }
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    parameters: {
        backgrounds: {
            default: 'gray',
            values: [
                { name: 'gray', value: '#ccc' },
                { name: 'white', value: '#fff' },
                { name: 'black', value: '#000' }
            ]
        }
    }
}
