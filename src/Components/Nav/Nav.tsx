import NavLinksRightDesktop from "./NavLinksRightDesktop";
import NavLinksLeftDesktop from "./NavLinksLeftDesktop";

export default function Nav() {
    return (
        <div className="isolate bg-white">
            <div className="lg">
                <nav className="bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <NavLinksLeftDesktop />
                            <NavLinksRightDesktop />
                            {/*<NavMobil />*/}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}