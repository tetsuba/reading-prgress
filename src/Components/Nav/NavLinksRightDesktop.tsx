import { useState } from 'react'
import { useSelector } from 'react-redux'
import { userTokenSelector } from '../../store/user/userSelectors'

// COMPONENTS
import Modal from '../Modal/Modal'
import Login from '../../Views/Login'
import Button from '../Button/Button'
import NavMenu from "./NavMenu";

export default function NavLinksRightDesktop() {
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
                                aria-expanded="false"
                                aria-haspopup="true"
                            />
                        ) : (
                            <>
                                <Button
                                    type="button"
                                    clickHandler={() => setShowLogin(true)}
                                    template="secondary"
                                >
                                    Log in
                                </Button>
                                {showLogin && showLogin && (
                                    <Modal className="max-w-xl">
                                        <Login setShowLogin={setShowLogin} />
                                    </Modal>
                                )}
                            </>
                        )}
                    </div>

                    {showMenu && <NavMenu clickHandler={() => setShowMenu(false)} />}
                </div>
            </div>
        </div>
    )
}
