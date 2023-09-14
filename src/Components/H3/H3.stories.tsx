import type { Meta, StoryObj } from '@storybook/react'
import H3 from './H3'

const meta = {
    title: 'HTML TAGS/H3',
    component: H3,
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
} satisfies Meta<typeof H3>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: 'H3'
    }
}
