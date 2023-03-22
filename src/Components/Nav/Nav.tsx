import NavLinksRightDesktop from './NavLinksRightDesktop'
import NavLinksLeftDesktop from './NavLinksLeftDesktop'

export default function Nav() {
    return (
        <div className="isolate h-16 md:h-auto">
            <nav className="fixed w-full bg-gray-800 md:relative">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <NavLinksLeftDesktop />
                        <NavLinksRightDesktop />
                    </div>
                </div>
            </nav>
        </div>
    )
}
