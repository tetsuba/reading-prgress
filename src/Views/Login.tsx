import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { formDataToObject, getErrorMessage } from '../lib/utils'
import { loginUser } from '../lib/service'
import { updateUser } from '../store/user/userSlice'

// COMPONENTS
import Button from '../Components/Button/Button'
import H3 from '../Components/H3/H3'
import Label from '../Components/Form/Label'
import Input from '../Components/Form/Input'
import ErrorMessage from '../Components/Form/ErrorMessage'

type PropTypes = {
    setShowLogin: (p: boolean) => void
}
export default function Login(props: PropTypes) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const mutation = useMutation(loginUser, {
        onSuccess: async (data) => {
            dispatch(updateUser(data.data))
        },
        onSettled: async () => {
            props.setShowLogin(false)
            navigate('/dashboard')
        }
    })
//'
//
//
    return (
        <div data-testid="login-view">
            <Button
                template="icon"
                className="absolute ml-auto right-2.5 top-3 p-1.5"
                dataTestid="modal-close"
                type="button"
                svg="close"
                clickHandler={() => props.setShowLogin(false)}
            />
            <div className="px-6 py-6 lg:px-8">
                <H3 className="mb-3">Sign in to our platform</H3>
                <form
                    data-testid="login-form"
                    className="space-y-6"
                    onSubmit={(event) => {
                        event.preventDefault()
                        const obj = formDataToObject(event.target)
                        mutation.mutate(obj)
                    }}
                >
                    <div>
                        <Label htmlFor="email">Your email</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="name@company.com"
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Your password</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                        />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex items-start">
                            <div className="flex h-5 items-center">
                                <Input
                                    type="checkbox"
                                    id="remember-me"
                                    value=""
                                />
                            </div>
                            <Label htmlFor="remember" className="ml-1">
                                Remember me
                            </Label>
                        </div>
                        <a
                            href="src/Components/Modal/View#"
                            className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                        >
                            Lost Password?
                        </a>
                    </div>
                    <ErrorMessage
                        show={mutation.isError}
                        className="mt-1 block"
                    >
                        {getErrorMessage(mutation.error)}
                    </ErrorMessage>
                    <Button className="w-full" type="submit" template="primary">
                        Login to your account
                    </Button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered?
                        <a
                            href="src/Components/Modal/View#"
                            className="text-blue-700 hover:underline dark:text-blue-500"
                        >
                            Create account
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}
