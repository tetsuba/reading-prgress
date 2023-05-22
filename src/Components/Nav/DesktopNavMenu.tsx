import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import { resetUserToInitialState } from '../../store/user/userSlice'
import ls from '../../lib/localStorage'
import { useDispatch } from 'react-redux'
import Svg from '../Svg/Svg'

function getClasses({ isActive }: { isActive: boolean }) {
    const defaultStyles = 'block px-4 py-2 text-sm round-xl'
    return isActive
        ? `bg-gray-100 text-gray-300 ${defaultStyles}`
        : `text-gray-700 hover:bg-gray-200 ${defaultStyles}`
}

export default function DesktopNavMenu() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div
            data-testid="user-menu"
            className="group/menu hidden pt-4 text-end md:block"
        >
            <Button data-testid="user-menu-button" template="svgUser">
                <Svg icon="user" />
            </Button>
            <div
                data-testid="user-menu-open"
                className="absolute right-8 top-12 mt-2 hidden w-48 rounded-md border-2 border-gray-300 bg-white py-2 text-left shadow-xl group-hover/menu:block"
                role="menu"
            >
                <NavLink className={getClasses} to="/profile">
                    Your Profile
                </NavLink>
                <NavLink className={getClasses} to="/settings">
                    Settings
                </NavLink>
                <Button
                    type="button"
                    template="desktopNavMenuSignOut"
                    onClick={() => {
                        dispatch(resetUserToInitialState())
                        ls.remove()
                        navigate('/')
                    }}
                >
                    Sign out
                </Button>
            </div>
        </div>
    )
}
