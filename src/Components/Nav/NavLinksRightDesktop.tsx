import Button from '../Button/Button'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import ls from '../../lib/localStorage'
import Modal from '../Modal/Modal'
import Login from '../../Views/Login'
import { useDispatch, useSelector } from 'react-redux'
import { userTokenSelector } from '../../store/user/userSelectors'
import { resetUserToInitialState } from '../../store/user/userSlice'

const classNames =
  'inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20'

function getClasses({ isActive }: { isActive: boolean }) {
  return isActive
    ? 'block px-4 py-2 text-sm text-gray-700 bg-gray-100'
    : 'block px-4 py-2 text-sm text-gray-700'
}
export default function NavLinksRightDesktop() {
  const dispatch = useDispatch()
  const userToken = useSelector(userTokenSelector)
  const [showMenu, setShowMenu] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const navigate = useNavigate()
  const token = ls.get()
  return (
    <div className="hidden md:block">
      <div className="ml-4 flex items-center md:ml-6">
        <div className="relative ml-3">
          <div>
            {userToken ? (
              <Button
                clickHandler={() => setShowMenu(!showMenu)}
                type="button"
                className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>

                {/*<img*/}
                {/*  className="h-8 w-8 rounded-full"*/}
                {/*  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"*/}
                {/*  alt=""*/}
                {/*/>*/}
              </Button>
            ) : (
              <>
                <Button
                  clickHandler={() => setShowLogin(true)}
                  className={classNames}
                >
                  Log in
                </Button>
                {showLogin && showLogin && (
                  <Modal>
                    <Login setShowLogin={setShowLogin} />
                  </Modal>
                )}
              </>
            )}
          </div>

          {showMenu && (
            <div
              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
            >
              <NavLink className={getClasses} to="/profile">
                Your Profile
              </NavLink>
              <NavLink className={getClasses} to="/settings">
                Settings
              </NavLink>
              <Button
                clickHandler={() => {
                  setShowMenu(!showMenu)
                  dispatch(resetUserToInitialState())
                  ls.remove()
                  navigate('/')
                }}
                className="block px-4 py-2 text-sm text-gray-700"
              >
                Sign out
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
