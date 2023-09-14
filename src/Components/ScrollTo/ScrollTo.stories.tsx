import type { Meta, StoryObj } from '@storybook/react'
import ScrollTo from './ScrollTo'

/**
 * The ScrollTo component allows programmatically scrolling to a specific position on the page.
 * The component returns null and does not render any actual UI.
 */
const meta = {
    title: 'COMP-UI-NONE/ScrollTo',
    component: ScrollTo,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    args: {},
    argTypes: {}
} satisfies Meta<typeof ScrollTo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        top: 0
    }
}
