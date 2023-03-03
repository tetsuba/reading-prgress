import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import { resetUserToInitialState } from '../../store/user/userSlice'
import ls from '../../lib/localStorage'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

function getClasses({ isActive }: { isActive: boolean }) {
    return isActive
        ? 'block px-4 py-2 text-sm text-gray-700 bg-gray-100'
        : 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
}

type PropTypes = {
    clickHandler: () => void
}

export default function NavMenu(props: PropTypes) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        document.addEventListener('click', props.clickHandler, true)
        return () => {
            document.removeEventListener('click', props.clickHandler, true)
        }
    }, [])

    return (
        <div
            data-testid="user-menu"
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
        >
            <NavLink
                onClick={props.clickHandler}
                className={getClasses}
                to="/profile"
            >
                Your Profile
            </NavLink>
            <NavLink
                onClick={props.clickHandler}
                className={getClasses}
                to="/settings"
            >
                Settings
            </NavLink>
            <Button
                type="button"
                template="none"
                clickHandler={() => {
                    props.clickHandler()
                    dispatch(resetUserToInitialState())
                    ls.remove()
                    navigate('/')
                }}
                className="block w-full bg-white px-4 py-2 text-left text-sm text-gray-700 hover:border-white hover:bg-gray-100"
            >
                Sign out
            </Button>
        </div>
    )
}
