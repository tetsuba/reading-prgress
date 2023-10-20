import { useSelector } from 'react-redux'
import { userTokenSelector } from '../../store/user/userSelectors'

// COMPONENTS
import DesktopNavigation from '../Nav/DesktopNavigation'
import Svg from '../Svg/Svg'
import Display from '../Dispay/Display'
import ModalLogin from '../Modal/ModalLogin'
import DesktopMenu from '../Nav/DesktopMenu'
import MobileNavigation from '../Nav/MobileNavigation'
import { studentNameSelector } from '../../store/students/studentsSelectors'

export default function Header() {
    const userToken = useSelector(userTokenSelector)
    const studentName = useSelector(studentNameSelector)

    return (
        <div className="fixed z-10 flex w-full flex-col md:h-auto">
            <header className="mx-auto flex h-16 w-full max-w-7xl justify-between bg-gray-800 px-4 sm:px-6 md:relative lg:px-8">
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
            {studentName && (
                <div
                    data-testid="student-name-holder"
                    className="flex w-full items-center justify-center max-md:absolute"
                >
                    <span className="rounded-b-lg border-x-2 border-b-2 border-gray-800 bg-white py-1 px-4 font-bold drop-shadow">
                        Student: {studentName}
                    </span>
                </div>
            )}
        </div>
    )
}
