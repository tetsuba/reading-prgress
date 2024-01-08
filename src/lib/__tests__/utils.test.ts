import { formDataToQueryString } from '../utils'
import { RegistrationFormTypes } from '../lib.types'

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
            const target: Partial<RegistrationFormTypes> = {
                addEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
                removeEventListener: vi.fn()
            }
            expect(formDataToQueryString(target)).toEqual(
                'firstName=&lastName=&email=&password='
            )
        })
    })
})
