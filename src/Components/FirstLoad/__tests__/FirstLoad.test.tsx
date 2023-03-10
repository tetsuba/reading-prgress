import {render, screen, waitFor, act, fireEvent, waitForElementToBeRemoved} from '@testing-library/react'
import { WrapperWith_Store_Query_Router } from '../../../vitest-setup'
import FirstLoad from '../FirstLoad'
import { Routes, Route } from 'react-router-dom'
import localStorage from '../../../lib/localStorage'
import axios from 'axios'
import store from "../../../store/store";
import {toggleViewGlobalExpired} from "../../../store/view/viewSlice";

vi.mock('axios')

const HomeMock = () => <div>Home Mock</div>
const DashMock = () => <div>Dash Mock</div>

const AXIOS_ERROR: any = {
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

describe('FirstLoad', () => {
    test('Bearer token is available and respond with an error', async () => {
        spyGet.mockImplementation(() => 'Bearer token')
        // @ts-ignore
        axios.get.mockRejectedValueOnce(AXIOS_ERROR)

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
        await waitFor(() => expect(axios.get).toHaveBeenCalled())
        await waitFor(() => expect(screen.getByText('Loading...')))
        await waitFor(() => expect(spyRemove).toHaveBeenCalledTimes(1))
    })
    test('Bearer token is available and respond with user data', async () => {
        spyGet.mockImplementation(() => 'Bearer token')
        // @ts-ignore
        axios.get.mockResolvedValueOnce({
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

        expect(spyGet).toHaveBeenCalled()
        await waitFor(() => expect(axios.get).toHaveBeenCalled())
        await waitFor(() => expect(screen.getByText('Loading...')))
        await waitFor(() => expect(screen.getByText('Dash Mock')))
    })
    test('Bearer token not available', async () => {
        spyGet.mockImplementation(() => null)

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
        // @ts-ignore
        axios.get.mockResolvedValueOnce({
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

        await act(() => {
            store.dispatch(toggleViewGlobalExpired(true))
        })

        await waitFor(() => expect(screen.getByTestId('modal-expired')))
        fireEvent.click(screen.getByTestId('expired-button'))
        await waitFor(() => expect(screen.queryByTestId('modal-expired')).toBeNull())
    })
})
