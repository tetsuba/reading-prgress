import type { Meta, StoryObj } from '@storybook/react'
import Modal from './Modal'
import Expired from './Expired'
import { Provider } from 'react-redux'
import store from '../../store/store'
import Confirmation from './Confirmation'
import RegisterBookForm from '../../Views/Books/RegisterBookForm'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../../App'
import MobileMenu from './MobileMenu'
import { BrowserRouter } from 'react-router-dom'
import Login from './Login'

const meta = {
    title: 'COMPONENTS/Modal',
    component: Modal,
    parameters: {
        layout: 'fullscreen'
    },
    args: {},
    argTypes: {
        className: {
            control: 'text',
            description: 'Add tailwind classes for positioning'
        }
    }
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    decorators: [(story) => <div id="modal">{story()}</div>],
    args: {
        children: (
            <>
                <p>Modal</p>
                <p>Modal</p>
                <p>Modal</p>
                <p>Modal</p>
                <p>Modal</p>
                <p>Modal</p>
            </>
        )
    }
}

export const ExpiredModal: Story = {
    decorators: [
        (story) => (
            <Provider store={store}>
                <div id="modal">{story()}</div>
            </Provider>
        )
    ],
    args: {
        className: 'max-w-md',
        children: <Expired />
    }
}

export const ConfirmationModal: Story = {
    decorators: [
        (story) => (
            <Provider store={store}>
                <div id="modal">{story()}</div>
            </Provider>
        )
    ],
    args: {
        className: 'max-w-md',
        children: (
            <Confirmation
                bookTitle="Book Title"
                clickHandlerDelete={() => null}
                clickHandlerCancel={() => null}
            />
        )
    }
}

export const RegisterBookModal: Story = {
    decorators: [
        (story) => (
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <div id="modal">{story()}</div>
                </QueryClientProvider>
            </Provider>
        )
    ],
    args: {
        className: '',
        children: <RegisterBookForm clickHandlerCancel={() => () => null} />
    }
}

export const MobileMenuModal: Story = {
    decorators: [
        (story) => (
            <Provider store={store}>
                <BrowserRouter>
                    <div id="modal">{story()}</div>
                </BrowserRouter>
            </Provider>
        )
    ],
    args: {
        className: 'h-full',
        children: <MobileMenu closeMenu={() => () => null} />
    }
}

export const LoginModal: Story = {
    decorators: [
        (story) => (
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <div id="modal">{story()}</div>
                    </BrowserRouter>
                </QueryClientProvider>
            </Provider>
        )
    ],
    args: {
        className: 'md:max-w-xl',
        children: <Login setShowLogin={() => null} />
    }
}
