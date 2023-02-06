import ls from '../localStorage'

describe('@localStorage', () => {
    const mockValue = 'value'
    beforeAll(() => {
        const localStorageMock = {
            getItem: vi.fn(() => mockValue),
            setItem: vi.fn(),
            removeItem: vi.fn()
        }
        // @ts-ignore
        global.localStorage = localStorageMock
    })

    test('should call local storage method setItem', () => {
        ls.save(mockValue)
        // @ts-ignore
        expect(localStorage.setItem.mock.calls.length).toBe(1)
    })

    test('should call local storage method getItem', () => {
        const value = ls.get()
        // @ts-ignore
        expect(localStorage.getItem.mock.calls.length).toBe(1)
        expect(value).toEqual(mockValue)
    })

    test('should call local storage method setItem', () => {
        ls.remove()
        // @ts-ignore
        expect(localStorage.removeItem.mock.calls.length).toBe(1)
    })
})
