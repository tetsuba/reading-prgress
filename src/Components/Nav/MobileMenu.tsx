import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import { resetUserToInitialState } from '../../store/user/userSlice'
import ls from '../../lib/localStorage'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

type PropTypes = {
    closeMenu: () => void
}
export default function MobileMenu(props: PropTypes) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [links] = useState([
        { name: 'Dashboard', path: 'dashboard' },
        { name: 'Books', path: 'books' },
        { name: 'Reading', path: 'reading' },
        { name: 'Sight Words', path: 'sight-words' },
        { name: 'Profile', path: 'profile' },
        { name: 'Settings', path: 'settings' }
    ])

    function isActive(locationPath: string, linkPath: string) {
        return locationPath.includes(linkPath)
            ? 'text-gray-300 bg-gray-100'
            : 'text-gray-800 bg-white'
    }

    function onClick(path: string) {
        navigate(`/${path}`)
        props.closeMenu()
    }

    return (
        <div data-testid="mobile-nav-menu" className="flex flex-col pt-10">
            <Button
                template="icon"
                className="absolute right-1 top-1.5 ml-auto p-1.5"
                dataTestid="modal-close"
                type="button"
                svg="close"
                clickHandler={() => props.closeMenu()}
            />
            {links.map((link, i) => (
                <Button
                    dataTestid="mobile-menu-link"
                    key={`mobile-menu-${i}`}
                    type="button"
                    template="none"
                    clickHandler={() => onClick(link.path)}
                    className={`py-4 text-center text-2xl ${isActive(
                        location.pathname,
                        link.path
                    )}`}
                >
                    {link.name}
                </Button>
            ))}

            <Button
                dataTestid="sign-out-mobile-menu"
                type="button"
                template="none"
                clickHandler={() => {
                    dispatch(resetUserToInitialState())
                    ls.remove()
                    navigate('/')
                }}
                className="w-full bg-blue-500 py-4 text-center text-2xl text-white"
            >
                Sign out
            </Button>
        </div>
    )
}
