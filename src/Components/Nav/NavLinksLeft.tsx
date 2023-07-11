import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { userTokenSelector } from '../../store/user/userSelectors'
import Svg from '../Svg/Svg'
import Display from '../Dispay/Display'

export default function NavLinksLeft() {
    const userToken = useSelector(userTokenSelector)
    const DEFAULT_CLASSES = 'text-sm font-medium rounded-md px-3 py-2'
    const NOT_ACTIVE = `${DEFAULT_CLASSES} text-gray-300 hover:bg-gray-700 hover:text-white`
    const ACTIVE = `${DEFAULT_CLASSES}  bg-gray-900 text-white`
    function getClasses({ isActive }: { isActive: boolean }) {
        return isActive ? ACTIVE : NOT_ACTIVE
    }

    return (
        <div className="flex items-center">
            <Svg icon="book" />
            <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                    <Display value={!!userToken}>
                        <>
                            <NavLink className={getClasses} to="/dashboard">
                                Dashboard
                            </NavLink>
                            <NavLink className={getClasses} to="books">
                                Books
                            </NavLink>
                            <NavLink className={getClasses} to="reading">
                                Reading
                            </NavLink>
                            <NavLink className={getClasses} to="sight-words">
                                Sight Words
                            </NavLink>
                        </>
                    </Display>
                    <Display value={!userToken}>
                        <>
                            <NavLink className={getClasses} to="/">
                                Home
                            </NavLink>
                            <NavLink className={getClasses} to="register">
                                Register
                            </NavLink>
                        </>
                    </Display>
                </div>
            </div>
        </div>
    )
}
