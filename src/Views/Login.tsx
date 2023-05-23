import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { formDataToObject, getErrorMessage } from '../lib/utils'
import { loginUser } from '../lib/service'
import { updateUser } from '../store/user/userSlice'

// COMPONENTS
import H3 from '../Components/H3/H3'
import Label from '../Components/Form/Label'
import Input from '../Components/Form/Input'
import ErrorMessage from '../Components/Form/ErrorMessage'
import Button from '../Components/Button/Button'
import Svg from '../Components/Svg/Svg'

type PropTypes = {
    setShowLogin: (p: boolean) => void
}
export default function Login(props: PropTypes) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const mutation = useMutation(loginUser, {
        onSuccess: (data) => {
            dispatch(updateUser(data.data))
        },
        onSettled: () => {
            props.setShowLogin(false)
            navigate('/dashboard')
        }
    })

    return (
        <div data-testid="login-view">
            <Button
                template="svgClose"
                data-testid="modal-close"
                onClick={() => props.setShowLogin(false)}
            >
                <Svg icon="close" />
            </Button>
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
                            template="text"
                            type="email"
                            name="email"
                            placeholder="name@company.com"
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Your password</Label>
                        <Input
                            template="text"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                        />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex items-start">
                            <div className="flex h-5 items-center">
                                <Input
                                    template="checkbox"
                                    type="checkbox"
                                    id="remember-me"
                                    value=""
                                />
                            </div>
                            <Label htmlFor="remember" className="ml-1">
                                Remember me
                            </Label>
                        </div>
                        <Button
                            template="textLink"
                            className="ml-1"
                            onClick={() => {
                                navigate('/register')
                                props.setShowLogin(false)
                            }}
                        >
                            Lost Password?
                        </Button>
                    </div>
                    <ErrorMessage
                        show={mutation.isError}
                        className="mt-1 block"
                    >
                        {getErrorMessage(mutation.error as Error)}
                    </ErrorMessage>
                    <Button template="primary" className="w-full" type="submit">
                        Login to your account
                    </Button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered?
                        <Button
                            template="textLink"
                            className="ml-1"
                            onClick={() => {
                                navigate('/register')
                                props.setShowLogin(false)
                            }}
                        >
                            Create account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
