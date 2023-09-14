import { useState } from 'react'

import Modal from '../Modal/Modal'
import MobileMenu from '../Modal/MobileMenu'
import Display from '../Dispay/Display'
import Button from '../Button/Button'

export default function MobileNavigation() {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <div role="dialog" aria-modal="true" className="h-6 md:hidden">
            <Button
                data-testid="mobile-menu-button"
                icon="menu"
                template="icon"
                onClick={() => setShowMenu(true)}
            />
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
