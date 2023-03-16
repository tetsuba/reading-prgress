import ls from '../localStorage'

describe('@localStorage', () => {
    const mockValue = 'value'
    const getItemMock = vi.fn(() => mockValue)
    const setItemMock = vi.fn()
    const removeItemMock = vi.fn()
    beforeAll(() => {
        const localStorageMock = {
            getItem: getItemMock,
            setItem: setItemMock,
            removeItem: removeItemMock
        }
        // @ts-ignore
        global.localStorage = localStorageMock
    })

    test('should call local storage method setItem', () => {
        ls.save(mockValue)
        expect(setItemMock).toHaveBeenCalled()
    })

    test('should call local storage method getItem', () => {
        const value = ls.get()
        expect(getItemMock).toHaveBeenCalled()
        expect(value).toEqual(mockValue)
    })

    test('should call local storage method setItem', () => {
        ls.remove()
        // @ts-ignore
        expect(removeItemMock).toHaveBeenCalled()
    })
})
