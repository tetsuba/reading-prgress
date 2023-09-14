import { useSelector } from 'react-redux'
import { userTokenSelector } from '../../store/user/userSelectors'

// COMPONENTS
import DesktopNavigation from '../Nav/DesktopNavigation'
import Svg from '../Svg/Svg'
import Display from '../Dispay/Display'
import ModalLogin from '../Modal/ModalLogin'
import DesktopMenu from '../Nav/DesktopMenu'
import MobileNavigation from '../Nav/MobileNavigation'

export default function Header() {
    const userToken = useSelector(userTokenSelector)

    return (
        <div className="fixed z-10 w-full bg-gray-800 md:h-auto">
            <header className="mx-auto flex h-16 max-w-7xl justify-between px-4 sm:px-6 md:relative lg:px-8">
                <div className="flex items-center">
                    <Svg icon="book" />
                    <DesktopNavigation />
                </div>
                <div className="flex items-center">
                    <Display value={!!userToken}>
                        <div data-testid="nav-menu">
                            <DesktopMenu />
                            <MobileNavigation />
                        </div>
                    </Display>
                    <Display value={!userToken}>
                        <ModalLogin />
                    </Display>
                </div>
            </header>
        </div>
    )
}
