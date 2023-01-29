import { fireEvent, render, screen, waitFor, act } from '@testing-library/react'
import { WrapperWith_Store_Query_Router } from '../../vitest-setup'
import Login from '../Login'

import axios from 'axios'
vi.mock('axios')

/* Note:
 * This was mocked to stop a warning message from being displayed
 * when running the test.
 * */
vi.mock('react-router-dom', () => ({
  ...(vi.importActual('react-router-dom') as object),
  useNavigate: () => vi.fn(),
}))

const setShowLoginMock = vi.fn()

describe('Login', () => {
  test('should render', () => {
    const { asFragment } = render(
      <WrapperWith_Store_Query_Router pathname="/">
        <Login setShowLogin={setShowLoginMock} />
      </WrapperWith_Store_Query_Router>
    )
    expect(asFragment()).toMatchSnapshot()
  })
  test('should return an error if email or password is incorrect', async () => {
    const AXIOS_ERROR: any = {
      code: 'ERR_BAD_RESPONSE',
      message: 'Request failed with status code 500',
      name: 'AxiosError',
      status: 500,
      statusText: 'Internal Server Error',
      response: {
        data: { error: 'Incorrect username or password' },
        status: 500,
      },
    }

    // @ts-ignore
    axios.post.mockRejectedValueOnce(AXIOS_ERROR)

    const eventTarget = {
      target: {
        password: {
          value: '1234',
        },
        email: {
          value: 'dsjfkldsf@fjkdlsfj.com',
        },
      },
    }

    render(
      <WrapperWith_Store_Query_Router pathname="/">
        <Login setShowLogin={setShowLoginMock} />
      </WrapperWith_Store_Query_Router>
    )

    act(() => {
      fireEvent.submit(screen.getByTestId('login-form'), eventTarget)
    })

    await waitFor(() => expect(screen.getByTestId('error-message')))
  })
  test('should return success with correct login details', async () => {
    // @ts-ignore
    axios.post.mockResolvedValue({
      data: {
        data: {
          firstName: 'firstName',
          lastName: 'lastName',
          email: 'email',
          id: 'id',
        },
      },
    })

    const eventTarget = {
      target: {
        password: {
          value: '123456',
        },
        email: {
          value: 'dsjfkldsf@fjkdlsfj.com',
        },
      },
    }

    render(
      <WrapperWith_Store_Query_Router pathname="/">
        <Login setShowLogin={setShowLoginMock} />
      </WrapperWith_Store_Query_Router>
    )

    act(() => {
      fireEvent.submit(screen.getByTestId('login-form'), eventTarget)
    })

    await waitFor(() => expect(setShowLoginMock).toHaveBeenCalled())
  })
})
