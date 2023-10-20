import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import { useDispatch } from 'react-redux'
import SignOutButton from './SignOutButton'

function getClasses({ isActive }: { isActive: boolean }) {
    const defaultStyles = 'block px-4 py-2 text-sm round-xl'
    return isActive
        ? `bg-gray-100 text-gray-300 ${defaultStyles}`
        : `text-gray-700 hover:bg-gray-200 ${defaultStyles}`
}

export default function DesktopMenu() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div
            data-testid="user-menu"
            className="group/menu relative hidden items-center text-end md:flex"
        >
            <Button
                data-testid="user-menu-button"
                icon="user"
                template="icon-user"
            />
            <div
                data-testid="user-menu-open"
                className="absolute right-0 top-6 mt-2 hidden w-48 rounded-md border-2 border-gray-300 bg-white py-2 text-left shadow-xl group-hover/menu:block"
                role="menu"
            >
                <NavLink className={getClasses} to="/profile">
                    Your Profile
                </NavLink>
                <NavLink className={getClasses} to="/settings">
                    Settings
                </NavLink>
                <SignOutButton template="nav-menu-desktop" />
            </div>
        </div>
    )
}
