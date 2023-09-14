import type { Meta, StoryObj } from '@storybook/react'
import Row from './Row'
import Svg from '../Svg/Svg'

const meta = {
    title: 'Components/Row',
    component: Row,
    parameters: {
        layout: 'fullscreen'
    },
    tags: ['autodocs'],
    args: {},
    argTypes: {}
} satisfies Meta<typeof Row>

export default meta
type Story = StoryObj<typeof meta>

export const Odd: Story = {
    args: {
        index: 1,
        icon: 'library',
        iconColor: 'red',
        text: 'Book Title',
        children: <Svg icon="delete" />
    }
}

export const Even: Story = {
    args: {
        index: 2,
        icon: 'library',
        iconColor: 'red',
        text: 'Book Title',
        children: <Svg icon="delete" />
    }
}

export const ExampleList = () => {
    const list = [
        { index: 1, text: 'Book Title' },
        { index: 2, text: 'Book Title' },
        { index: 3, text: 'Book Title' },
        { index: 4, text: 'Book Title' },
        { index: 5, text: 'Book Title' },
        { index: 6, text: 'Book Title' },
        { index: 7, text: 'Book Title' }
    ]
    return list.map((data) => (
        <Row
            key={`key-${data.index}`}
            {...data}
            iconColor="black"
            icon="library"
        >
            <Svg icon="delete" />
        </Row>
    ))
}
