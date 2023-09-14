import type { Meta, StoryObj } from '@storybook/react'
import Speech from './Speech'

const meta = {
    title: 'INCOMPLETE/Speech',
    component: Speech,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    args: {},
    argTypes: {}
} satisfies Meta<typeof Speech>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {}
