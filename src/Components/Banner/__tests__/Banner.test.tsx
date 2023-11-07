import { fireEvent, render, screen } from '@testing-library/react'
import { WrapperWith_Store_Query_Router } from '../../../vitest-setup'
import Banner from '../Banner'
import store from '../../../store/store'

const mockData = {
    completed: false,
    date: '12/12/12',
    title: 'Title',
    bookId: 1,
    collectionId: '002'
}

describe('Banner', () => {
    test('should render a green banner', () => {
        render(
            <WrapperWith_Store_Query_Router pathname={'/dashboard'}>
                <Banner data={{ ...mockData, completed: true }} className="" />
            </WrapperWith_Store_Query_Router>
        )

        expect(screen.getByTestId('banner-test').getAttribute('class')).toMatch(
            'border-green-500 bg-green-50'
        )
        expect(screen.getByTestId('icon-thumb'))
    })

    test('should render a red banner', () => {
        render(
            <WrapperWith_Store_Query_Router pathname={'/dashboard'}>
                <Banner data={mockData} className="" />
            </WrapperWith_Store_Query_Router>
        )
        expect(screen.getByTestId('banner-test').getAttribute('class')).toMatch(
            'border-red-500 bg-red-50'
        )
        expect(screen.getByTestId('icon-warning'))
    })

    test('clicking on the banner title', () => {
        render(
            <WrapperWith_Store_Query_Router pathname={'/dashboard'}>
                <Banner data={mockData} className="" />
            </WrapperWith_Store_Query_Router>
        )
        fireEvent.click(screen.getByTestId('banner-title'))
        expect(store.getState().current.bookId).toBe(mockData.bookId)
        expect(store.getState().current)
    })
})
