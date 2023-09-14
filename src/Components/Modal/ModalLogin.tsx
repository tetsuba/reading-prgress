import Button from '../Button/Button'
import Display from '../Dispay/Display'
import Modal from './Modal'
import Login from './Login'
import { useState } from 'react'

export default function ModalLogin() {
    const [showLogin, setShowLogin] = useState(false)

    return (
        <>
            <Button onClick={() => setShowLogin(true)} template="secondary">
                Log in
            </Button>
            <Display value={showLogin}>
                <Modal className="md:max-w-xl">
                    <Login setShowLogin={setShowLogin} />
                </Modal>
            </Display>
        </>
    )
}
