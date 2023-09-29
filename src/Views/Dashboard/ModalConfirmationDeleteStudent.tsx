import { useMutation } from 'react-query'
import * as R from 'ramda'

// API
import { deleteStudent } from '../../api/api-students'

// COMPONENTS
import Modal from '../../Components/Modal/Modal'
import Confirmation from '../../Components/Modal/Confirmation'
import Display from '../../Components/Dispay/Display'
import { useDispatch } from 'react-redux'
import { addStudents } from '../../store/students/studentsSlice'
import { StateStudentTypes } from '../../store/store-types'

// TODO: if delete responds an error what should happen?

type PropTypes = {
    student: StateStudentTypes | null
    closeModal: () => void
    show: boolean
}

export default function ModalConfirmationDeleteStudent(props: PropTypes) {
    const dispatch = useDispatch()
    const { student, show, closeModal } = props
    const mutation = useMutation(deleteStudent, {
        onSuccess: (data) => {
            dispatch(addStudents(data.data))
            closeModal()
        }
    })

    return (
        <Display value={show}>
            <Modal className="max-w-md">
                <Confirmation
                    bookTitle={`  
                        ${R.pathOr('', ['firstname'], student)} 
                        ${R.pathOr('', ['lastname'], student)} 
                    `}
                    clickHandlerCancel={() => closeModal()}
                    clickHandlerDelete={() => {
                        if (student) mutation.mutate(student.studentId)
                    }}
                />
            </Modal>
        </Display>
    )
}
