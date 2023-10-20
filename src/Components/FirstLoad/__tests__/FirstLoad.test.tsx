import { Mocked } from 'vitest'
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'
import { WrapperWith_Store_Query_Router } from '../../../vitest-setup'
import FirstLoad from '../FirstLoad'
import { Routes, Route } from 'react-router-dom'
import localStorage from '../../../lib/localStorage'
import store from '../../../store/store'
import { toggleViewGlobalExpired } from '../../../store/view/viewSlice'

import axios from 'axios'
vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

const HomeMock = () => <div>Home Mock</div>
const DashMock = () => <div>Dash Mock</div>

type AxiosErrorTypes = {
    code: string
    message: string
    name: string
    status: number
    statusText: string
    response: {
        data: { error: string }
        status: number
    }
}
const AXIOS_ERROR: AxiosErrorTypes = {
    code: 'ERR_BAD_RESPONSE',
    message: 'Request failed with status code 500',
    name: 'AxiosError',
    status: 500,
    statusText: 'Internal Server Error',
    response: {
        data: { error: 'Incorrect username or password' },
        status: 500
    }
}

const spyGet = vi.spyOn(localStorage, 'get')
const spyRemove = vi.spyOn(localStorage, 'remove')
const spyGetStudentId = vi.spyOn(localStorage, 'getStudentId')

describe('FirstLoad', () => {
    afterEach(() => {
        spyGet.mockReset()
    })
    test('Bearer token is available and respond with an error', async () => {
        spyGet.mockImplementation(() => 'Bearer token')
        mockedAxios.get.mockRejectedValueOnce(AXIOS_ERROR)

        render(
            <WrapperWith_Store_Query_Router pathname="/dash">
                <FirstLoad>
                    <Routes>
                        <Route path="/" element={<HomeMock />} />
                        <Route path="/dash" element={<DashMock />} />
                    </Routes>
                </FirstLoad>
            </WrapperWith_Store_Query_Router>
        )

        expect(spyGet).toHaveBeenCalledTimes(2)
        await waitFor(() => expect(screen.getByText('Loading...')))
        await waitFor(() => expect(spyRemove).toHaveBeenCalledTimes(1))
    })
    test('Bearer token is available and respond with user data', async () => {
        const SUCCESS: {
            status: number
            data: {
                user: {
                    firstName: string
                    lastName: string
                    email: string
                    id: string
                }
            }
        } = {
            status: 200,
            data: {
                user: {
                    firstName: 'firstName',
                    lastName: 'lastName',
                    email: 'email',
                    id: 'id'
                }
            }
        }
        spyGet.mockImplementation(() => 'Bearer token')
        mockedAxios.get.mockResolvedValueOnce(SUCCESS)

        render(
            <WrapperWith_Store_Query_Router pathname="/dash">
                <FirstLoad>
                    <Routes>
                        <Route path="/" element={<HomeMock />} />
                        <Route path="/dash" element={<DashMock />} />
                    </Routes>
                </FirstLoad>
            </WrapperWith_Store_Query_Router>
        )

        expect(spyGet).toHaveBeenCalled()
        expect(spyGetStudentId).toHaveBeenCalled()
        await waitFor(() => expect(screen.getByText('Loading...')))
        await waitFor(() => expect(screen.getByText('Dash Mock')))
    })
    test('Bearer token not available', async () => {
        spyGet.mockImplementation(() => '')

        render(
            <WrapperWith_Store_Query_Router pathname="/dash">
                <FirstLoad>
                    <Routes>
                        <Route path="/" element={<HomeMock />} />
                        <Route path="/dash" element={<DashMock />} />
                    </Routes>
                </FirstLoad>
            </WrapperWith_Store_Query_Router>
        )

        await waitFor(() => expect(axios).not.toHaveBeenCalled())
        await waitFor(() => expect(screen.getByText('Dash Mock')))
    })
    test('Session is expired', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            status: 200,
            data: {
                data: {
                    firstName: 'firstName',
                    lastName: 'lastName',
                    email: 'email',
                    id: 'id'
                }
            }
        })

        render(
            <WrapperWith_Store_Query_Router pathname="/dash">
                <FirstLoad>
                    <Routes>
                        <Route path="/" element={<HomeMock />} />
                        <Route path="/dash" element={<DashMock />} />
                    </Routes>
                </FirstLoad>
            </WrapperWith_Store_Query_Router>
        )

        act(() => {
            store.dispatch(toggleViewGlobalExpired(true))
        })

        await waitFor(() => expect(screen.getByTestId('modal-expired')))
        fireEvent.click(screen.getByTestId('expired-button'))
        await waitFor(() =>
            expect(screen.queryByTestId('modal-expired')).toBeNull()
        )
    })
})
