import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import Register from '../Register'
import { WrapperWithQuery } from '../../vitest-setup'
import axios from 'axios'
import { delay } from '../../lib/utils'
vi.mock('axios')

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
    // @ts-ignore
    axios.post.mockResolvedValue(delay(10))

    const eventTarget = {
      target: {
        firstName: { value: 'bob' },
        lastName: { value: 'bob' },
        password: { value: '1234' },
        email: { value: 'a@a.com' },
      },
    }
    render(
      <WrapperWithQuery>
        <Register />
      </WrapperWithQuery>
    )

    act(() => {
      fireEvent.submit(screen.getByTestId('register-form'), eventTarget)
    })

    await expect(screen.findByTestId('loading-user'))
    await waitFor(() => expect(screen.getByTestId('success-message')))
  })
  test('should return an error', async () => {
    // @ts-ignore
    axios.post.mockRejectedValueOnce({ error: { message: 'error' } })

    const eventTarget = {
      target: {
        firstName: { value: '' },
        lastName: { value: '' },
        password: { value: '' },
        email: { value: '' },
      },
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
