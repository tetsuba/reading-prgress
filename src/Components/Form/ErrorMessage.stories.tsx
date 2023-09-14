import type { Meta, StoryObj } from '@storybook/react'
import ErrorMessage from './ErrorMessage'

const meta = {
    title: 'Form/ErrorMessage',
    component: ErrorMessage,
    parameters: {
        layout: 'centered'
    },
    args: {},
    argTypes: {}
} satisfies Meta<typeof ErrorMessage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        show: true,
        children: 'This is an error message',
        className: ''
    }
}
