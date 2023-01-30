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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
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
