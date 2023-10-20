import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'

import ls from '../../lib/localStorage'
import { viewGlobalExpiredSelector } from '../../store/view/viewSelectors'

// COMPONENTS
import Modal from '../Modal/Modal'
import Expired from '../Modal/Expired'
import Loading from '../Loading/Loading'
import { getUserDetails } from '../../api/user'
import { updateUser } from '../../store/user/userSlice'
import { addBooks } from '../../store/books/booksSlice'
import { addStudents } from '../../store/students/studentsSlice'
import { updateCurrentStudentId } from '../../store/current/currentSlice'

type PropTypes = {
    children: JSX.Element
}
export default function FirstLoad(props: PropTypes) {
    const dispatch = useDispatch()
    const sessionExpired = useSelector(viewGlobalExpiredSelector)
    const token = ls.get()
    const studentId = ls.getStudentId()

    /* NOTE:
     * Look inside getUserDetails to see a dispatch to update
     * the store.user
     * */
    const { isLoading, isError, isSuccess, data } = useQuery(
        ['user'],
        getUserDetails,
        {
            retry: false,
            enabled: !!token && !sessionExpired
        }
    )

    if (isLoading) return <Loading />
    if (isError) ls.remove()
    if (isSuccess) {
        const {
            data: { user, books, students }
        } = data
        dispatch(updateUser({ user, token }))
        dispatch(addBooks(books))
        dispatch(addStudents(students))
        if (studentId) dispatch(updateCurrentStudentId(studentId))
    }

    return (
        <>
            {sessionExpired && (
                <Modal className="max-w-md">
                    <Expired />
                </Modal>
            )}
            {props.children}
        </>
    )
}
