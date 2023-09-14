import type { Meta, StoryObj } from '@storybook/react'
import Main from './Main'

const meta = {
    title: 'Layout/Main',
    component: Main,
    parameters: {
        layout: 'fullscreen'
    },
    args: {},
    argTypes: {}
} satisfies Meta<typeof Main>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    parameters: {
        backgrounds: {
            default: 'gray',
            values: [
                { name: 'gray', value: '#ccc' },
                { name: 'white', value: '#fff' },
                { name: 'black', value: '#000' }
            ]
        }
    },
    args: {
        children: (
            <>
                <h1 className="text-6xl">Content goes here</h1>
                <h2 className="text-5xl">Content goes here</h2>
                <h3 className="text-4xl">Content goes here</h3>
                <h4 className="text-3xl">Content goes here</h4>
                <h5 className="text-2xl">Content goes here</h5>
                <h6 className="text-1xl">Content goes here</h6>
            </>
        )
    }
}
