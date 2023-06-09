import { useState } from 'react'
import { useSelector } from 'react-redux'
import { userTokenSelector } from '../../store/user/userSelectors'

// COMPONENTS
import Modal from '../Modal/Modal'
import Login from '../../Views/Login'
import NavMenu from './NavMenu'
import Button from '../Button/Button'
import Display from '../Dispay/Display'

export default function NavLinksRight() {
    const userToken = useSelector(userTokenSelector)
    const [showLogin, setShowLogin] = useState(false)

    return (
        <div className="flex items-center">
            <Display value={!!userToken}>
                <NavMenu />
            </Display>
            <Display value={!userToken}>
                <>
                    <Button
                        template="secondary"
                        onClick={() => setShowLogin(true)}
                    >
                        Log in
                    </Button>
                    <Display value={showLogin}>
                        <Modal className="max-w-xl">
                            <Login setShowLogin={setShowLogin} />
                        </Modal>
                    </Display>
                </>
            </Display>
        </div>
    )
}
