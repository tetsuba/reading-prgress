import { useState } from 'react'
import { useSelector } from 'react-redux'
import { userTokenSelector } from '../../store/user/userSelectors'

// COMPONENTS
import Modal from '../Modal/Modal'
import Login from '../../Views/Login'
import Button from '../Button/Button'
import NavMenu from './NavMenu'

export default function NavLinksRightDesktop() {
    const userToken = useSelector(userTokenSelector)
    const [showLogin, setShowLogin] = useState(false)

    return (
        <div className="flex items-center">
            {userToken ? (
                <NavMenu />
            ) : (
                <>
                    <Button
                        className="mt-2"
                        type="button"
                        clickHandler={() => setShowLogin(true)}
                        template="secondary"
                    >
                        Log in
                    </Button>
                    {showLogin && showLogin && (
                        <Modal className="max-w-xl">
                            <Login setShowLogin={setShowLogin} />
                        </Modal>
                    )}
                </>
            )}
        </div>
    )
}
