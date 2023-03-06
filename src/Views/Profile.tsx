import Header from '../Components/Header/Header'
import Input from '../Components/Form/Input'
import Label from '../Components/Form/Label'
import { useSelector } from 'react-redux'
import {userSelector} from '../store/user/userSelectors'

export default function Profile() {
    const userProfile = useSelector(userSelector)
    return (
        <>
            <Header text="Profile" />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div>
                            <div className="md:grid md:grid-cols-3 md:gap-6">
                                <div className="md:col-span-1">
                                    <div className="px-4 sm:px-0">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                                            Profile
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-600">
                                            This information will not be
                                            displayed publicly.
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-5 md:col-span-2 md:mt-0">
                                    <form
                                        data-testid="register-form"
                                        className="space-y-6"
                                    >
                                        <div>
                                            <Label htmlFor="firstName">
                                                First Name:
                                            </Label>
                                            <Input
                                                type="text"
                                                name="firstName"
                                                placeholder={
                                                    userProfile.firstname
                                                }
                                                readonly
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="lastName">
                                                Last Name:
                                            </Label>
                                            <Input
                                                type="text"
                                                name="lastName"
                                                placeholder={
                                                    userProfile.lastname
                                                }
                                                readonly
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="email">
                                                Your email:
                                            </Label>
                                            <Input
                                                type="email"
                                                name="email"
                                                placeholder={userProfile.email}
                                                readonly
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
