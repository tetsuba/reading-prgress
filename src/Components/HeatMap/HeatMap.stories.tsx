import type { Meta, StoryObj } from '@storybook/react'
import HeatMap from './HeatMap'

/**
 * the HeatMap component generates a visual colored keyword grid to represent
 * relative data values for a set of words.
 *
 */
const meta = {
    title: 'COMPONENTS/HeatMap',
    component: HeatMap,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    args: {},
    argTypes: {}
} satisfies Meta<typeof HeatMap>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: 'Header',
        words: [
            { word: 'word', index: 1 },
            { word: 'that', index: 2 },
            { word: 'that', index: 3 },
            { word: 'that', index: 1 },
            { word: 'that', index: 4 },
            { word: 'that', index: 7 },
            { word: 'that', index: 9 }
        ],
        search: '',
        color: 'red'
    }
}
