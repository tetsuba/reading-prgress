import { formDataToQueryString, isEmpty, RegistrationFormTypes } from '../utils'

describe('utils', () => {
    describe('formDataToQueryString()', () => {
        test('has form data', () => {
            const target: RegistrationFormTypes = {
                addEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
                removeEventListener: vi.fn(),
                firstName: { value: 'Bob' },
                lastName: { value: 'Bill' },
                email: { value: 'bob@bob.com' },
                password: { value: '123456' }
            }
            expect(formDataToQueryString(target)).toEqual(
                'firstName=Bob&lastName=Bill&email=bob@bob.com&password=123456'
            )
        })
        test('does not have form data', () => {
            const target: RegistrationFormTypes = {
                addEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
                removeEventListener: vi.fn()
            }
            expect(formDataToQueryString(target)).toEqual(
                'firstName=&lastName=&email=&password='
            )
        })
    })
    describe('isEmpty', () => {
        it('should return true for null', () => {
            expect(isEmpty(null)).toBe(true)
        })

        it('should return true for undefined', () => {
            expect(isEmpty(undefined)).toBe(true)
        })

        it('should return true for empty array', () => {
            expect(isEmpty([])).toBe(true)
        })

        it('should return true for empty object', () => {
            expect(isEmpty({})).toBe(true)
        })

        it('should return false for non-empty values', () => {
            expect(isEmpty('string')).toBe(false)
            expect(isEmpty([1, 2, 3])).toBe(false)
            expect(isEmpty({ foo: 'bar' })).toBe(false)
        })
    })
})
