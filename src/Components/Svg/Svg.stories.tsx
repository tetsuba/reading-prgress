import type { Meta, StoryObj } from '@storybook/react'
import Svg, { icons, SvgIconTypes } from './Svg'

/**
 * The Svg component renders SVG icons based on a provided icon prop.
 */
const meta = {
    title: 'COMPONENTS/Svg',
    component: Svg,
    parameters: {
        layout: 'centered',
        backgrounds: {
            values: [
                { name: 'black', value: '#000' },
                { name: 'gray', value: '#CCC' }
            ]
        }
    },
    tags: ['autodocs'],
    args: {},
    argTypes: {
        className: {
            control: 'text',
            description: 'Add tailwind classes for positioning'
        }
    }
} satisfies Meta<typeof Svg>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        icon: 'close'
    }
}

export const Icons = () => (
    <>
        {icons.map((icon, index) => (
            <div key={`icon-${index}`} className="m-8 flex">
                <Svg icon={icon} />
                <span className="ml-8">{icon}</span>
            </div>
        ))}
    </>
)
