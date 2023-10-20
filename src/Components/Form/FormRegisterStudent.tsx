import { useMutation } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'

// STORE
import { userIdSelector } from '../../store/user/userSelectors'
import { addStudents } from '../../store/students/studentsSlice'

// COMPONENTS
import Form from './Form'
import Label from './Label'
import Input from './Input'
import ErrorMessage from './ErrorMessage'
import { getErrorMessage } from '../../lib/utils'
import Button from '../Button/Button'

// API
import { registerStudent } from '../../api/students'

type FormTypes = {
    closeModal: () => void
}
export default function FormRegisterStudent(props: FormTypes) {
    const dispatch = useDispatch()
    const userId = useSelector(userIdSelector)
    const { closeModal } = props
    const mutation = useMutation(registerStudent, {
        onSuccess: (data) => {
            dispatch(addStudents(data.data))
            closeModal()
        }
    })

    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault()
                const data = {
                    firstname: R.pathOr('', ['firstName', 'value'], e.target),
                    lastname: R.pathOr('', ['lastName', 'value'], e.target),
                    dob: R.pathOr('', ['dob', 'value'], e.target),
                    userId: userId
                }
                mutation.mutate(data)
            }}
        >
            <>
                <div className="mb-6">
                    <Label htmlFor="firstName">First Name:</Label>
                    <Input
                        template="text"
                        type="text"
                        name="firstName"
                        placeholder="first name"
                    />
                </div>
                <div className="mb-6">
                    <Label htmlFor="lastName">Last Name:</Label>
                    <Input
                        template="text"
                        type="text"
                        name="lastName"
                        placeholder="last name"
                    />
                </div>
                <div className="mb-6">
                    <Label htmlFor="dob">Date of birth:</Label>
                    <Input template="text" type="date" name="dob" />
                </div>
                <ErrorMessage show={mutation.isError} className="mb-6 block">
                    {getErrorMessage(mutation.error as Error)}
                </ErrorMessage>
                <Button
                    template="primary"
                    className="w-full justify-center"
                    type="submit"
                >
                    Register Student
                </Button>
            </>
        </Form>
    )
}
