import { useState } from 'react'
import { useSelector } from 'react-redux'
import { userTokenSelector } from '../../store/user/userSelectors'

// COMPONENTS
import Modal from '../Modal/Modal'
import Login from '../../Views/Login'
import NavMenu from './NavMenu'
import Button from '../Button/Button'

export default function NavLinksRight() {
    const userToken = useSelector(userTokenSelector)
    const [showLogin, setShowLogin] = useState(false)

    return (
        <div className="flex items-center">
            {userToken ? (
                <NavMenu />
            ) : (
                <>
                    <Button
                        template="secondary"
                        onClick={() => setShowLogin(true)}
                    >
                        Log in
                    </Button>
                    {showLogin && (
                        <Modal className="max-w-xl">
                            <Login setShowLogin={setShowLogin} />
                        </Modal>
                    )}
                </>
            )}
        </div>
    )
}
