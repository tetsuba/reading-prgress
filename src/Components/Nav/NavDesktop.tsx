import {Link} from "react-router-dom";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import Login from "../../Views/Login";
import {useState} from "react";

export default function NavDesktop() {
    const [showLogin, setShowLogin] = useState(false)
    return (
        <nav className="flex h-9 items-center justify-between" aria-label="Global">

            <div className="sm:flex sm:justify-center sm:gap-x-12">
                <Link to="/">Home</Link>
                <Link to="contact">Contact</Link>
                <Link to="reading">Reading</Link>
                <Link to="register">Register</Link>
            </div>
            <div className="hidden sm:flex sm:min-w-0 sm:flex-1 sm:justify-end">
                <Button
                    clickHandler={() => setShowLogin(true)}
                    className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    Log in
                </Button>
            </div>
            {
                showLogin && (
                    showLogin && (
                        <Modal><Login setShowLogin={setShowLogin} /></Modal>
                    )
                )
            }
        </nav>
    )
}