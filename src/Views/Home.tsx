import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Modal from '../Components/Modal/Modal'
import Login from './Login'
import Button from '../Components/Button/Button'
import H1 from '../Components/H1/H1'
import P from '../Components/P/P'

const Home = () => {
    const navigate = useNavigate()
    const [showLogin, setShowLogin] = useState(false)
    return (
        <main>
            <div className="relative px-6 lg:px-8">
                <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
                    <div>
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                                <span className="text-gray-600">
                                    Decodable Reading Books For Children
                                    <Link
                                        to=""
                                        className="pl-1 font-semibold text-indigo-600"
                                    >
                                        <span
                                            className="absolute inset-0"
                                            aria-hidden="true"
                                        ></span>
                                        Read more
                                        <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                </span>
                            </div>
                        </div>
                        <div>
                            <H1>Data to improve reading</H1>
                            <P>
                                Anim aute id magna aliqua ad ad non deserunt
                                sunt. Qui irure qui lorem cupidatat commodo.
                                Elit sunt amet fugiat veniam occaecat fugiat
                                aliqua.
                            </P>
                            <div className="mt-8 flex gap-x-4 sm:justify-center">
                                <Button
                                    template='primary'
                                    clickHandler={() => setShowLogin(true)}
                                >
                                    Log in{' '}
                                    <span
                                        className="text-indigo-200"
                                        aria-hidden="true"
                                    >
                                        &rarr;
                                    </span>
                                </Button>

                                <Button
                                    template='secondary'
                                    clickHandler={() => navigate('/register')}
                                    >
                                    Register{' '}
                                    <span
                                        className="text-indigo-200"
                                        aria-hidden="true"
                                    >
                                        &rarr;
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showLogin && (
                <Modal>
                    <Login setShowLogin={setShowLogin} />
                </Modal>
            )}
        </main>
    )
}

export default Home
