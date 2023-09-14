import type { Meta, StoryObj } from '@storybook/react'
import H1 from './H1'

const meta = {
    title: 'HTML TAGS/H1',
    component: H1,
    parameters: {
        layout: 'centered'
    },
    args: {},
    argTypes: {
        className: {
            control: 'text',
            description: 'Add tailwind classes for positioning'
        }
    }
} satisfies Meta<typeof H1>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: 'H1'
    }
}
