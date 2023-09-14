import type { Meta, StoryObj } from '@storybook/react'
import P from './P'

const meta = {
    title: 'HTML TAGS/P',
    component: P,
    parameters: {
        layout: 'centered'
    },
    args: {},
    argTypes: {}
} satisfies Meta<typeof P>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: 'This is a paragraph',
        className: ''
    }
}
