import SubHeader from '../Components/SubHeader/SubHeader'
import Input from '../Components/Form/Input'
import Label from '../Components/Form/Label'
import { useSelector } from 'react-redux'
import { userSelector } from '../store/user/userSelectors'
import Main from '../Components/Main/Main'

export default function Profile() {
    const userProfile = useSelector(userSelector)
    return (
        <>
            <SubHeader text="Profile" />
            <Main>
                <div>
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <div className="md:px4">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Profile
                                </h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    This information will not be displayed
                                    publicly.
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
                                        template="text"
                                        type="text"
                                        name="firstName"
                                        placeholder={userProfile.firstName}
                                        readonly
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="lastName">Last Name:</Label>
                                    <Input
                                        template="text"
                                        type="text"
                                        name="lastName"
                                        placeholder={userProfile.lastName}
                                        readonly
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Your email:</Label>
                                    <Input
                                        template="text"
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
            </Main>
        </>
    )
}
