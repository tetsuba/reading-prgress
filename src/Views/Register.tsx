import { useMutation } from 'react-query'
import { registerUser } from '../lib/service'
import { formDataToQueryString, getErrorMessage } from '../lib/utils'

// COMPONENTS
import Label from '../Components/Form/Label'
import Input from '../Components/Form/Input'
import Button from '../Components/Button/Button'
import ErrorMessage from '../Components/Form/ErrorMessage'
import Header from '../Components/Header/Header'

export default function Register() {
    const mutation = useMutation(registerUser)

    return (
        <>
            <Header text="Register" />
            <main>
                <div className="mx-auto max-w-2xl py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="rounded-lg border-4 border-dashed border-gray-200">
                            <div className="sm:container">
                                <div className="px-6 py-6">
                                    {mutation.isLoading && (
                                        <p data-testid="loading-user">
                                            Registering user...
                                        </p>
                                    )}
                                    {mutation.isSuccess && (
                                        <div data-testid="success-message">
                                            <p>Registration Completed.</p>
                                            <p>
                                                Please click on the log in
                                                button...
                                            </p>
                                        </div>
                                    )}

                                    {!mutation.isSuccess && (
                                        <form
                                            data-testid="register-form"
                                            className="space-y-6"
                                            onSubmit={(event) => {
                                                event.preventDefault()
                                                const queryString =
                                                    formDataToQueryString(
                                                        event.target
                                                    )
                                                mutation.mutate(queryString)
                                            }}
                                        >
                                            <div>
                                                <Label htmlFor="firstName">
                                                    First Name:
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="firstName"
                                                    placeholder="first name"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="lastName">
                                                    Last Name:
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="lastName"
                                                    placeholder="last name"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="email">
                                                    Your email:
                                                </Label>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    placeholder="name@company.com"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="password">
                                                    Your password:
                                                </Label>
                                                <Input
                                                    type="password"
                                                    name="password"
                                                    placeholder="••••••••"
                                                />
                                            </div>

                                            <ErrorMessage
                                                show={mutation.isError}
                                                className="mt-1 block"
                                            >
                                                {getErrorMessage(
                                                    mutation.error as Error
                                                )}
                                            </ErrorMessage>

                                            <div className="flex justify-end">
                                                <Button
                                                    template="primary"
                                                    type="submit"
                                                >
                                                    Register
                                                </Button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
