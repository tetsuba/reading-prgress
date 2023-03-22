import DesktopNavMenu from './DesktopNavMenu'
import MobileNavMenu from './MobileNavMenu'

export default function NavMenu() {
    return (
        <div data-testid="nav-menu">
            <DesktopNavMenu />
            <MobileNavMenu />
        </div>
    )
}
