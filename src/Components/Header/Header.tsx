import NavLinksLeftDesktop from "../Nav/NavLinksLeftDesktop";
import NavMobil from "../Nav/NavMobile";
import Nav from "../Nav/Nav";

export default function Header() {
    return (
        <div className="isolate bg-white">
            <div className="px-6 pt-6 lg:px-8">
                <Nav />
            </div>
        </div>
    )
 }