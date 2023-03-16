import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Mocked } from 'vitest'
import Register from '../Register'
import { WrapperWithQuery } from '../../vitest-setup'
import { delay } from '../../lib/utils'

import axios from 'axios'
vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

describe('Register', () => {
    test('should render', () => {
        const { asFragment } = render(
            <WrapperWithQuery>
                <Register />
            </WrapperWithQuery>
        )
        expect(asFragment()).toMatchSnapshot()
    })
    test('should return success', async () => {
        mockedAxios.post.mockResolvedValue(delay(10))

        const eventTarget = {
            target: {
                firstName: { value: 'bob' },
                lastName: { value: 'bob' },
                password: { value: '1234' },
                email: { value: 'a@a.com' }
            }
        }
        render(
            <WrapperWithQuery>
                <Register />
            </WrapperWithQuery>
        )

        act(() => {
            fireEvent.submit(screen.getByTestId('register-form'), eventTarget)
        })

        expect(screen.findByTestId('loading-user'))
        await waitFor(() => expect(screen.getByTestId('success-message')))
    })
    test('should return an error', async () => {
        const ERROR = { error: { message: 'error' } }
        mockedAxios.post.mockRejectedValueOnce(ERROR)

        const eventTarget = {
            target: {
                firstName: { value: '' },
                lastName: { value: '' },
                password: { value: '' },
                email: { value: '' }
            }
        }
        render(
            <WrapperWithQuery>
                <Register />
            </WrapperWithQuery>
        )

        act(() => {
            fireEvent.submit(screen.getByTestId('register-form'), eventTarget)
        })

        await waitFor(() => expect(screen.getByTestId('error-message')))
    })
})
