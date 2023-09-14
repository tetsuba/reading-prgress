import type { Meta, StoryObj } from '@storybook/react'
import Loading from './Loading'

const meta = {
    title: 'COMPONENTS/Loading',
    component: Loading,
    parameters: {
        layout: 'centered'
    },
    args: {},
    argTypes: {}
} satisfies Meta<typeof Loading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
