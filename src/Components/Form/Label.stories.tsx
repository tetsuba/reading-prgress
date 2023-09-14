import type { Meta, StoryObj } from '@storybook/react'
import Label from './Label'

const meta = {
    title: 'Form/Label',
    component: Label,
    parameters: {
        layout: 'centered'
    },
    args: {},
    argTypes: {}
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: 'Label',
        htmlFor: ''
    }
}
