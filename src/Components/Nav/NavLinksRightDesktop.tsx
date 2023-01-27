import Button from "../Button/Button"
import {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import ls from "../../lib/localStorage";
import Modal from "../Modal/Modal";
import Login from "../../Views/Login"

const classNames = 'inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20'

function getClasses({isActive}: {isActive: boolean}) {
    return isActive
        ? "block px-4 py-2 text-sm text-gray-700 bg-gray-100"
        : "block px-4 py-2 text-sm text-gray-700"
}
export default function NavLinksRightDesktop() {
    const [showMenu, setShowMenu] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const navigate = useNavigate()
    const token = ls.get()
    return (
        <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
                <div className="relative ml-3">
                    <div>
                        {
                            token
                            ? (
                                    <Button
                                        clickHandler={() => setShowMenu(!showMenu)}
                                        type="button"
                                        className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        id="user-menu-button" aria-expanded="false" aria-haspopup="true"
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <img className="h-8 w-8 rounded-full"
                                             src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                             alt="" />
                                    </Button>
                                )
                            : (
                                    <>
                                        <Button
                                            clickHandler={() => setShowLogin(true)}
                                            className={classNames}>
                                            Log in
                                        </Button>
                                        {
                                            showLogin && (
                                                showLogin && (
                                                    <Modal><Login setShowLogin={setShowLogin} /></Modal>
                                                )
                                            )
                                        }
                                    </>
                                )
                        }
                    </div>

                    { showMenu && (
                        <div
                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                            <NavLink className={getClasses} to="/profile">Your Profile</NavLink>
                            <NavLink className={getClasses} to="/settings">Settings</NavLink>
                            <Button
                                clickHandler={() => {
                                    setShowMenu(!showMenu)
                                    ls.remove()
                                    navigate('/')
                                }}
                                className="block px-4 py-2 text-sm text-gray-700">
                                Sign out
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
