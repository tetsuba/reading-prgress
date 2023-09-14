import type { Meta, StoryObj } from '@storybook/react'
import Display from './Display'

/**
 * A simple component that conditionally
 * renders its children based on a value prop.
 */
const meta = {
    title: 'COMP-UI-NONE/Display',
    component: Display,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    args: {},
    argTypes: {
        value: {
            control: 'boolean',
            description: 'Show or hide its children'
        },
        children: {
            control: 'none'
        }
    }
} satisfies Meta<typeof Display>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: <p>Display</p>,
        value: true
    }
}
