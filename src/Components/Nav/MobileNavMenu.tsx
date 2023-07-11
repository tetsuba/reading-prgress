import { useState } from 'react'

import Modal from '../Modal/Modal'
import MobileMenu from './MobileMenu'
import { MenuButton } from '../Button/Buttons'
import Display from '../Dispay/Display'

export default function MobileNavMenu() {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <div role="dialog" aria-modal="true" className="h-6 md:hidden">
            <MenuButton onClick={() => setShowMenu(true)} />
            <Display value={showMenu}>
                <Modal className="h-full">
                    <MobileMenu
                        closeMenu={() => {
                            setShowMenu(false)
                        }}
                    />
                </Modal>
            </Display>
        </div>
    )
}
