import type { Meta, StoryObj } from '@storybook/react'
import Input from './Input'

const meta = {
    title: 'Form/Input',
    component: Input,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    args: {},
    argTypes: {}
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
    args: {
        placeholder: 'Placeholder',
        template: 'text',
        type: 'text'
    }
}

export const Email: Story = {
    args: {
        template: 'text',
        type: 'email',
        value: 'something@something.com'
    }
}

export const Password: Story = {
    args: {
        template: 'text',
        type: 'password',
        value: '12345678899'
    }
}

export const Checkbox: Story = {
    args: {
        template: 'checkbox',
        type: 'checkbox'
    }
}
