import {render, screen, waitFor} from "@testing-library/react";
import {WrapperWith_Store_Query_Router} from "../../../vitest-setup";
import FirstLoad from "../FirstLoad"
import {Routes, Route } from "react-router-dom"
import localStorage from '../../../lib/localStorage'
import axios from 'axios'

const mockedNavigator = vi.fn()

vi.mock('axios')


vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom")
    return {
        ...actual as object,
        useNavigate: () => mockedNavigator
    }
})

const HomeMock = () => (<div>Home Mock</div>)
const DashMock = () => (<div>Dash Mock</div>)

const AXIOS_ERROR: any = {
    code: 'ERR_BAD_RESPONSE',
    message: 'Request failed with status code 500',
    name: 'AxiosError',
    status: 500,
    statusText: 'Internal Server Error',
    response: {
        data: {"error":"Incorrect username or password"},
        status: 500,
    }
}

const spy = vi.spyOn(localStorage, 'get')

describe('FirstLoad', () => {
    test('Bearer token is available and get an error', async () => {
        spy.mockImplementation(() => 'Bearer token')
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

        expect(spy).toHaveBeenCalledTimes(1)
        await waitFor(() => expect(axios.get).toHaveBeenCalled())
        await waitFor(() => expect(screen.getByText('Loading...')))
        await waitFor(() => expect(mockedNavigator).toHaveBeenCalled())
    })
    test('Bearer token is available and get user data', async () => {
        spy.mockImplementation(() => 'Bearer token')
        // @ts-ignore
        axios.get.mockResolvedValueOnce({
            data: {
                data: {
                    firstName: 'firstName',
                    lastName: 'lastName',
                    email: 'email',
                    id: 'id'
                }
            },
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

        expect(spy).toHaveBeenCalled()
        await waitFor(() => expect(axios.get).toHaveBeenCalled())
        await waitFor(() => expect(screen.getByText('Loading...')))
        await waitFor(() => expect(screen.getByText('Dash Mock')))
    })
    test('Bearer token not available', async () => {
        spy.mockImplementation(() => null)

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
})