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
                className="absolute right-1 top-1.5"
                icon="close"
                template="icon-close"
                onClick={() => props.closeMenu()}
            />
            {links.map((link, i) => (
                <Button
                    data-testid="mobile-menu-link"
                    key={`mobile-menu-${i}`}
                    template="none"
                    onClick={() => onClick(link.path)}
                    className={`py-4 text-center text-2xl ${isActive(
                        location.pathname,
                        link.path
                    )}`}
                >
                    {link.name}
                </Button>
            ))}

            <Button
                data-testid="sign-out-mobile-menu"
                template="menu-button-mobile"
                onClick={() => {
                    dispatch(resetUserToInitialState())
                    ls.remove()
                    navigate('/')
                }}
            >
                Sign out
            </Button>
        </div>
    )
}
