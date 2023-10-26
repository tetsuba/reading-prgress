import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { WrapperWith_Store_Query_Router } from '../../../vitest-setup'
import Dashboard from '../Dashboard'

describe('Dashboard', () => {
    test('should render a list of students', async () => {
        const { asFragment } = render(
            <WrapperWith_Store_Query_Router pathname={'/dashboard'}>
                <Dashboard />
            </WrapperWith_Store_Query_Router>
        )
        await waitFor(() => {
            expect(screen.queryAllByTestId('row-test')).toHaveLength(2)
            expect(screen.getByText('John Bob')).exist
            expect(screen.getByText('Bob Billy')).exist
        })
        expect(asFragment()).toMatchSnapshot()
    })

    describe('click on registering a student', () => {
        test('should open and close a modal', () => {
            render(
                <WrapperWith_Store_Query_Router pathname={'/dashboard'}>
                    <Dashboard />
                </WrapperWith_Store_Query_Router>
            )
            expect(screen.queryByTestId('modal-test')).toBeNull()
            fireEvent.click(screen.getByText('Register Student'))
            expect(screen.getByTestId('modal-test')).exist
            fireEvent.click(screen.getByTestId('modal-close'))
            expect(screen.queryByTestId('modal-test')).toBeNull()
        })
    })

    describe('clicking on select a student', () => {
        afterEach(() => {
            fireEvent.click(screen.getByText('Change Student'))
        })
        test('should render last book read banners', () => {
            render(
                <WrapperWith_Store_Query_Router pathname={'/dashboard'}>
                    <Dashboard />
                </WrapperWith_Store_Query_Router>
            )
            fireEvent.click(screen.queryAllByText('Select')[0])
            expect(screen.getAllByTestId('banner-test')).toHaveLength(2)
            expect(
                screen.getAllByTestId('banner-test')[0].getAttribute('class')
            ).toMatch('bg-red-50')
            expect(
                screen.getAllByTestId('banner-test')[1].getAttribute('class')
            ).toMatch('bg-green-50')
            expect(screen.getByText('Change Student')).exist
        })
        test('should render three heat maps', () => {
            render(
                <WrapperWith_Store_Query_Router pathname={'/dashboard'}>
                    <Dashboard />
                </WrapperWith_Store_Query_Router>
            )
            fireEvent.click(screen.queryAllByText('Select')[0])
            expect(screen.getAllByTestId('heat-map')).toHaveLength(3)
            expect(screen.getByText('Change Student')).exist
        })
    })
})
