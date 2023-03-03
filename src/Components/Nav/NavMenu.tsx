import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import { resetUserToInitialState } from '../../store/user/userSlice'
import ls from '../../lib/localStorage'
import { useDispatch } from 'react-redux'

function getClasses({ isActive }: { isActive: boolean }) {
    return isActive
        ? 'block px-4 py-2 text-sm text-gray-700 bg-gray-100 round-xl'
        : 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 round-xl'
}

export default function NavMenu() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div data-testid="user-menu" className="group/menu pt-4 text-end">
            <Button
                dataTestid="user-menu-button"
                template="icon"
                svg="user"
                type="button"
                className="rounded-full bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-expanded="false"
                aria-haspopup="true"
            />
            <div
                data-testid="user-menu-open"
                className="hidden w-48 rounded-md border-2 border-gray-300 bg-white py-2 text-left shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none group-hover/menu:block"
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
                    template="none"
                    clickHandler={() => {
                        dispatch(resetUserToInitialState())
                        ls.remove()
                        navigate('/')
                    }}
                    className="block w-full bg-white px-4 py-2 text-left text-sm text-gray-700 hover:border-white hover:bg-gray-100"
                >
                    Sign out
                </Button>
            </div>
        </div>
    )
}
