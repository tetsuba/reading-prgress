import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { userTokenSelector } from '../../store/user/userSelectors'

export default function NavLinksLeftDesktop() {
  const userToken = useSelector(userTokenSelector)
  const NOT_ACTIVE =
    'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
  const ACTIVE =
    'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
  function getClasses({ isActive }: { isActive: boolean }) {
    return isActive ? ACTIVE : NOT_ACTIVE
  }

  return (
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <img
          className="h-8 w-8"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
        />
      </div>
      <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-4">
          {userToken ? (
            <>
              <NavLink className={getClasses} to="/dashboard">
                Dashboard
              </NavLink>
              <NavLink className={getClasses} to="reading">
                Reading
              </NavLink>
              <NavLink className={getClasses} to="books">
                Books
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className={getClasses} to="/">
                Home
              </NavLink>
              <NavLink className={getClasses} to="contact">
                Contact
              </NavLink>
              <NavLink className={getClasses} to="register">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
