import { useState } from 'react'

import Button from '../Button/Button'
import Modal from '../Modal/Modal'
import MobileMenu from './MobileMenu'

export default function MobileNavMenu() {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <div role="dialog" aria-modal="true" className="h-6 md:hidden">
            <Button
                dataTestid="mobile-menu-button"
                template="icon"
                svg="menu"
                type="button"
                className=""
                clickHandler={() => setShowMenu(true)}
            />
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
