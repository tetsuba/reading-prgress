import Button from '../Button/Button'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import ls from '../../lib/localStorage'
import Modal from '../Modal/Modal'
import Login from '../../Views/Login'
import { useDispatch, useSelector } from 'react-redux'
import { userTokenSelector } from '../../store/user/userSelectors'
import { resetUserToInitialState } from '../../store/user/userSlice'

function getClasses({ isActive }: { isActive: boolean }) {
    return isActive
        ? 'block px-4 py-2 text-sm text-gray-700 bg-gray-100'
        : 'block px-4 py-2 text-sm text-gray-700'
}

export default function NavLinksRightDesktop() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userToken = useSelector(userTokenSelector)
    const [showMenu, setShowMenu] = useState(false)
    const [showLogin, setShowLogin] = useState(false)

    return (
        <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
                <div className="relative ml-3">
                    <div>
                        {userToken ? (
                            <Button
                                dataTestid="user-menu-button"
                                template="icon"
                                svg="user"
                                clickHandler={() => setShowMenu(!showMenu)}
                                type="button"
                                className="rounded-full bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                id="user-menu-button"
                                aria-expanded="false"
                                aria-haspopup="true"
                            />
                        ) : (
                            <>
                                <Button
                                    clickHandler={() => setShowLogin(true)}
                                    template="secondary"
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
                            data-testid="user-menu"
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
                                template="none"
                                clickHandler={() => {
                                    setShowMenu(!showMenu)
                                    dispatch(resetUserToInitialState())
                                    ls.remove()
                                    navigate('/')
                                }}
                                className="block w-full bg-white px-4 py-2 text-left text-sm text-gray-700 hover:border-white"
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
