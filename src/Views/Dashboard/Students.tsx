import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'
import ls from '../../lib/localStorage'

// STORE
import { studentsSelector } from '../../store/students/studentsSelectors'
import { updateCurrentStudentId } from '../../store/current/currentSlice'

// TYPES
import { StateStudentTypes } from '../../store/store.types'

// COMPONENTS
import Loop from '../../Components/Loop/Loop'
import StudentRow from '../../Components/Row/StudentRow'
import ModalConfirmationDeleteStudent from './ModalConfirmationDeleteStudent'

export default function Students() {
    const dispatch = useDispatch()
    const students = useSelector(studentsSelector)
    const [deleteStudent, setDeleteStudent] =
        useState<StateStudentTypes | null>(null)

    return (
        <section>
            <Loop array={students}>
                <StudentRow
                    selectStudent={(student) => {
                        dispatch(updateCurrentStudentId(student.studentId))
                        ls.saveStudentId(student.studentId)
                    }}
                    deleteStudent={(student) => {
                        setDeleteStudent(student)
                    }}
                />
            </Loop>
            <ModalConfirmationDeleteStudent
                student={deleteStudent}
                closeModal={() => setDeleteStudent(null)}
                show={R.isNotNil(deleteStudent)}
            />
        </section>
    )
}
