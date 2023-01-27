import {Link} from "react-router-dom"
import LoginLogoutButton from "./LoginLogoutButton"
import ls from "../../lib/localStorage";

export default function NavDesktop() {
    const token = ls.get()
    return (
        <nav className="flex h-9 items-center justify-between" aria-label="Global">
            <div className="sm:flex sm:justify-center sm:gap-x-12">
                {
                    token
                        ? (
                            <>
                                <Link to="/dashboard">Dashboard</Link>
                                <Link to="reading">Reading</Link>
                                <Link to="books">Books</Link>
                            </>
                        )
                        : (
                            <>
                                <Link to="/">Home</Link>
                                <Link to="contact">Contact</Link>
                                <Link to="register">Register</Link>
                            </>
                        )
                }
            </div>
            <div className="hidden sm:flex sm:min-w-0 sm:flex-1 sm:justify-end">
                <LoginLogoutButton />
            </div>
        </nav>
    )
}