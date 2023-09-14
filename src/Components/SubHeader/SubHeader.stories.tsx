import type { Meta, StoryObj } from '@storybook/react'
import SubHeader from './SubHeader'
import Button from '../Button/Button'

const meta = {
    title: 'Layout/SubHeader',
    component: SubHeader,
    parameters: {
        layout: 'fullscreen'
    },
    args: {},
    argTypes: {}
} satisfies Meta<typeof SubHeader>

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
        text: 'Sub Header'
    }
}

export const WithBackButton: Story = {
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
        text: 'Sub Header',
        children: (
            <Button
                className="ml-4 flex items-center place-self-start"
                icon="back"
                template="secondary"
            >
                <span className="ml-2 hidden md:inline">Back</span>
            </Button>
        )
    }
}
