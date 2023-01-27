import Button from "../Button/Button";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Modal from "../Modal/Modal";
import Login from "../../Views/Login";
import ls from "../../lib/localStorage";

const classNames = 'inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20'
export default function LoginLogoutButton() {
    const [showLogin, setShowLogin] = useState(false)
    const navigate = useNavigate();
    const token = ls.get()

    return !token
        ? (
            <>
                <Button
                    clickHandler={() => setShowLogin(true)}
                    className={classNames}>
                    Log in
                </Button>
                {
                    showLogin && (
                        showLogin && (
                            <Modal><Login setShowLogin={setShowLogin} /></Modal>
                        )
                    )
                }
            </>
        ) : (
            <Button
                clickHandler={() => {
                    ls.remove()
                    navigate('/')
                }}
                className={classNames}>
                Log out
            </Button>
        )
}


