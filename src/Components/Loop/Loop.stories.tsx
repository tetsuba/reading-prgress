import type { Meta, StoryObj } from '@storybook/react'
import Loop from './Loop'

const meta = {
    title: 'COMP-UI-NONE/Loop',
    component: Loop,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    args: {},
    argTypes: {}
} satisfies Meta<typeof Loop>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
