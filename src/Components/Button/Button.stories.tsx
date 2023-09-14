import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta = {
    title: 'COMPONENTS/Button',
    component: Button,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    args: {
        template: 'primary',
        children: 'text'
    },
    argTypes: {
        className: {
            control: 'text',
            description: 'Add tailwind classes for positioning'
        },
        children: {
            description: '',
            options: ['None', 'Text'],
            control: { type: 'select' },
            mapping: {
                None: '',
                Text: 'Text'
            }
        }
    }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        template: 'primary'
    }
}

export const Secondary: Story = {
    args: {
        template: 'secondary',
        children: 'text'
    }
}

export const Tertiary: Story = {
    args: {
        template: 'tertiary',
        children: 'text'
    }
}

export const Warning: Story = {
    args: {
        template: 'warning',
        children: 'text'
    }
}

export const Disabled: Story = {
    args: {
        template: 'disabled',
        children: 'text'
    }
}

export const TextLink: Story = {
    args: {
        template: 'text-link',
        children: 'text'
    }
}

export const IconCloseButton: Story = {
    args: {
        icon: 'close',
        template: 'icon-close',
        children: ''
    }
}

export const IconHistoryButton: Story = {
    args: {
        icon: 'history',
        template: 'icon-history',
        children: ''
    }
}

export const IconBackButton: Story = {
    args: {
        icon: 'back',
        template: 'icon-back',
        children: ''
    }
}

export const IconUserButton: Story = {
    args: {
        icon: 'user',
        template: 'icon-user',
        children: ''
    }
}

export const IconDeleteButton: Story = {
    args: {
        icon: 'delete',
        template: 'icon-delete',
        children: ''
    }
}

export const IconCheckBadgeButton: Story = {
    args: {
        icon: 'check-badge',
        template: 'icon-check-badge',
        children: ''
    }
}

export const IconLeftAndTextButton: Story = {
    args: {
        icon: 'back',
        template: 'primary',
        children: <span className="ml-2">Text</span>
    }
}

export const IconRightAndTextButton: Story = {
    args: {
        icon: 'back',
        template: 'primary',
        children: <span className="mr-2">Text</span>,
        right: true
    }
}
