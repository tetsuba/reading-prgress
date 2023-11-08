import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { formDataToObject, getErrorMessage } from '../../lib/utils'
import { updateUser } from '../../store/user/userSlice'
import { addBooks } from '../../store/books/booksSlice'

// COMPONENTS
import H3 from '../H3/H3'
import Label from '../Form/Label'
import Input from '../Form/Input'
import ErrorMessage from '../Form/ErrorMessage'
import Button from '../Button/Button'
import { loginUser } from '../../api/user'
import { addStudents } from '../../store/students/studentsSlice'
import { useEffect, useRef } from 'react'

type PropTypes = {
    setShowLogin: (p: boolean) => void
}
export default function Login(props: PropTypes) {
    const eleRefButton = useRef<HTMLButtonElement | null>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const mutation = useMutation(loginUser, {
        onSuccess: (data) => {
            const {
                data: { user, token, books, students }
            } = data
            dispatch(updateUser({ user, token }))
            dispatch(addBooks(books))
            dispatch(addStudents(students))
            props.setShowLogin(false)
            navigate('/dashboard')
        }
    })

    useEffect(() => {
        // TODO: Fix this hacky way of focusing on the first input element after the modal is rendered
        setTimeout(() => {
            if (eleRefButton.current !== null) {
                eleRefButton.current.focus()
            }
        }, 0)
    }, [])

    return (
        <div
            role="dialog"
            aria-labelledby="Login"
            aria-describedby="Please enter your username and password"
            data-testid="login-view"
        >
            <Button
                tabIndex={0}
                ref={eleRefButton}
                className="absolute right-2.5 top-3"
                data-testid="modal-close"
                icon="close"
                onClick={() => props.setShowLogin(false)}
                template="icon-close"
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
                            template="text-link"
                            onClick={() => {
                                navigate('/lostPassword')
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
                    <Button
                        template="primary"
                        className="w-full justify-center"
                        type="submit"
                    >
                        Login to your account
                    </Button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered?
                        <Button
                            onBlur={() => eleRefButton.current?.focus()}
                            className="ml-1"
                            template="text-link"
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
