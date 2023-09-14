import type { Meta, StoryObj } from '@storybook/react'
import Textarea from './Textarea'

const meta = {
    title: 'Form/Textarea',
    component: Textarea,
    parameters: {
        layout: 'centered'
    },
    args: {},
    argTypes: {}
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        rows: 10,
        placeholder: 'Text area box'
    }
}
