import {
  render,
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import Home from '../Home'
import {
  WrapperWithRouter,
  WrapperWithQueryAndRouter,
  WrapperWith_Store_Query_Router,
} from '../../vitest-setup'

describe('Home', () => {
  beforeAll(() => {
    const portal = document.createElement('div')
    portal.setAttribute('id', 'modal')
    document.body.appendChild(portal)
  })
  describe('@Render', () => {
    test('should render first load', () => {
      const { asFragment } = render(
        <WrapperWithRouter pathname="/">
          <Home />
        </WrapperWithRouter>
      )
      expect(asFragment()).toMatchSnapshot()
    })

    test('should open and close login modal', async () => {
      render(
        <WrapperWith_Store_Query_Router pathname="/">
          <Home />
        </WrapperWith_Store_Query_Router>
      )
      fireEvent.click(screen.getByText('Log in'))
      await waitFor(() => expect(screen.getByTestId('login-view')))
      fireEvent.click(screen.getByTestId('modal-close'))
      expect(screen.queryByTestId('login-view')).toBeNull()
    })
  })
})
