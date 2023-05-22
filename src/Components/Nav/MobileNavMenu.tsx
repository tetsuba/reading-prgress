import { useState } from 'react'

import Button from '../Button/Button'
import Modal from '../Modal/Modal'
import MobileMenu from './MobileMenu'
import Svg from '../Svg/Svg'

export default function MobileNavMenu() {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <div role="dialog" aria-modal="true" className="h-6 md:hidden">
            <Button
                data-testid="mobile-menu-button"
                template="svg"
                className=""
                onClick={() => setShowMenu(true)}
            >
                <Svg icon="menu" />
            </Button>
            {showMenu && (
                <Modal className="h-full">
                    <MobileMenu
                        closeMenu={() => {
                            setShowMenu(false)
                        }}
                    />
                </Modal>
            )}
        </div>
    )
}
