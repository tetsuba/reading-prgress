import { Mocked } from 'vitest'
import axios from 'axios'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { WrapperWith_Store_Query_Router } from '../../../vitest-setup'
import FormRegisterStudent from '../FormRegisterStudent'
import store from '../../../store/store'
vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

describe('FormRegisterStudent', () => {
    test('form submit: success', async () => {
        const mockCloseModal = vi.fn()
        const mockStudentsData = [
            {
                firstname: 'firstName',
                lastname: 'lastName',
                dob: '2000-12-12',
                studentId: '1'
            }
        ]

        mockedAxios.post.mockResolvedValue({
            data: mockStudentsData
        })

        const eventTarget = {
            target: {
                firstname: {
                    value: 'firstname'
                },
                lastname: {
                    value: 'lastname'
                },
                dob: {
                    value: '2000-12-12'
                },
                studentId: {
                    value: 1
                }
            }
        }

        render(
            <WrapperWith_Store_Query_Router pathname="/">
                <FormRegisterStudent closeModal={mockCloseModal} />
            </WrapperWith_Store_Query_Router>
        )

        act(() => {
            fireEvent.submit(screen.getByText('Register Student'), eventTarget)
        })

        await waitFor(() => expect(mockCloseModal).toHaveBeenCalled())
        expect(store.getState().students).toEqual(mockStudentsData)
    })

    test('form submit: fail', async () => {
        const mockCloseModal = vi.fn()
        const ERROR = {
            response: {
                data: {
                    stack: 'form submit failed'
                }
            }
        }

        mockedAxios.post.mockRejectedValueOnce(ERROR)

        const eventTarget = {
            target: {
                firstname: {
                    value: ''
                },
                lastname: {
                    value: ''
                },
                dob: {
                    value: ''
                },
                studentId: {
                    value: 1
                }
            }
        }

        render(
            <WrapperWith_Store_Query_Router pathname="/">
                <FormRegisterStudent closeModal={mockCloseModal} />
            </WrapperWith_Store_Query_Router>
        )

        act(() => {
            fireEvent.submit(screen.getByText('Register Student'), eventTarget)
        })

        await waitFor(() => expect(mockCloseModal).not.toHaveBeenCalled())
        await waitFor(() => expect(screen.getByTestId('error-message')))
    })
})
