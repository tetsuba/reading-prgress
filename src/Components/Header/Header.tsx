import NavDesktop from "../Nav/NavDesktop";
import NavMobil from "../Nav/NavMobile";



export default function Header() {
    return (
        <div className="isolate bg-white">
            <div className="px-6 pt-6 lg:px-8">
                <NavDesktop />
                {/*<NavMobil />*/}
            </div>
        </div>
    )
 }