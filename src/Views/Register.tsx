import { useMutation } from 'react-query'
import { registerUser } from '../lib/service'
import { formDataToQueryString, getErrorMessage } from '../lib/utils'

// COMPONENTS
import Label from '../Components/Form/Label'
import Input from '../Components/Form/Input'
import Button from '../Components/Button/Button'
import ErrorMessage from '../Components/Form/ErrorMessage'
import Header from '../Components/Header/Header'
import Main from '../Components/Main/Main'

export default function Register() {
    const mutation = useMutation(registerUser)

    return (
        <>
            <Header text="Register" />
            <Main>
                <div className="mx-auto max-w-3xl rounded-lg border-dashed border-gray-200 sm:border-4">
                    <div className="sm:p-6">
                        {mutation.isLoading && (
                            <p data-testid="loading-user">
                                Registering user...
                            </p>
                        )}
                        {mutation.isSuccess && (
                            <div data-testid="success-message">
                                <p>Registration Completed.</p>
                                <p>Please click on the log in button...</p>
                            </div>
                        )}

                        {!mutation.isSuccess && (
                            <form
                                data-testid="register-form"
                                className="space-y-6"
                                onSubmit={(event) => {
                                    event.preventDefault()
                                    const queryString = formDataToQueryString(
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
                                        template="text"
                                        type="text"
                                        name="firstName"
                                        placeholder="first name"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="lastName">Last Name:</Label>
                                    <Input
                                        template="text"
                                        type="text"
                                        name="lastName"
                                        placeholder="last name"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Your email:</Label>
                                    <Input
                                        template="text"
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
                                        template="text"
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <ErrorMessage
                                    show={mutation.isError}
                                    className="mt-1 block"
                                >
                                    {getErrorMessage(mutation.error as Error)}
                                </ErrorMessage>

                                <div className="flex sm:justify-end">
                                    <Button
                                        className="w-full sm:w-fit"
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
            </Main>
        </>
    )
}
