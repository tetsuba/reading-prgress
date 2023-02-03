import Button from '../Button/Button'
import { Link } from 'react-router-dom'

const mobilLinkClassNames =
    '-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10'
export default function NavMobil() {
    return (
        <div role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
                <div className="flex h-9 items-center justify-between">
                    <div className="flex">
                        <a href="src/Views#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="flex">
                        <Button className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                            Close menu
                        </Button>
                    </div>
                </div>
                <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                        <div className="space-y-2 py-6">
                            <Link className={mobilLinkClassNames} to="/">
                                Home
                            </Link>
                            <Link className={mobilLinkClassNames} to="contact">
                                Contact
                            </Link>
                            <Link className={mobilLinkClassNames} to="reading">
                                Reading
                            </Link>
                        </div>
                        <div className="py-6">
                            <a
                                href="src/Views#"
                                className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                            >
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
