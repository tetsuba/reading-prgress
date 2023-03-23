import NavLinksRight from './NavLinksRight'
import NavLinksLeft from './NavLinksLeft'

export default function Nav() {
    return (
        <div className="h-16 md:h-auto">
            <nav className="fixed z-10 w-full bg-gray-800 md:relative">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <NavLinksLeft />
                        <NavLinksRight />
                    </div>
                </div>
            </nav>
        </div>
    )
}
