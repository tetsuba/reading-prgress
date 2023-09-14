import type { Meta, StoryObj } from '@storybook/react'
import WordHeatMap from './WordHeatMap'

const meta = {
    title: 'COMPONENTS/WordHeatMap',
    component: WordHeatMap,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    args: {},
    argTypes: {}
} satisfies Meta<typeof WordHeatMap>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        max: 10,
        color: 'red',
        data: { word: 'this', index: 5 },
        index: 2
    }
}
