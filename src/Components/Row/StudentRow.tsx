import * as R from 'ramda'

// UTILS
import { greenText } from '../../Views/Books/book-utils'

// TYPES
import { StateStudentTypes } from '../../store/store.types'

// COMPONENTS
import Row from './Row'
import Button from '../Button/Button'

type PropTypes = {
    data?: StateStudentTypes
    index?: number
    deleteStudent: (v: StateStudentTypes) => void
    selectStudent: (v: StateStudentTypes) => void
}

export default function StudentRow(props: PropTypes) {
    const { data, index, deleteStudent, selectStudent } = props

    if (R.isNil(data) || R.isNil(index)) {
        return <>loading...</>
    }

    return (
        <Row
            index={index}
            text={`${data.firstname} ${data.lastname}`}
            icon="user2"
            iconColor={greenText()}
        >
            <Button
                data-testid="select-student"
                template="secondary"
                onClick={() => selectStudent(data)}
            >
                Select
            </Button>
            <Button
                className="ml-2"
                data-testid="student-delete"
                icon="delete"
                template="icon-delete"
                onClick={() => deleteStudent(data)}
            />
        </Row>
    )
}
