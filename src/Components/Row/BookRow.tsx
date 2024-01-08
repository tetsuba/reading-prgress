import * as R from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// STORE
import { updateCurrentBookId } from '../../store/current/currentSlice'

// COMPONENTS
import Button from '../Button/Button'
import Row from './Row'

// TYPES
import { SelectorBookTypes } from '../../store/selector.types'
import { currentStudentIdSelector } from '../../store/current/currentSelectors'
import { toggleBooksShowMessage } from '../../store/view/viewSlice'

type BookPropTypes = {
    data?: SelectorBookTypes
    index?: number
}

export default function BookRow(props: BookPropTypes) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const studentId = useSelector(currentStudentIdSelector)
    const { data, index } = props

    if (R.isNil(data) || R.isNil(index)) {
        return <>loading...</>
    }

    return (
        <Row
            index={index}
            text={data.title}
            icon="bookmark"
            iconColor={data.iconColor}
        >
            <Button
                data-testid="book-list-read"
                template="secondary"
                onClick={() => {
                    if (studentId) {
                        dispatch(updateCurrentBookId(data.id))
                        navigate('/reading')
                    } else {
                        dispatch(toggleBooksShowMessage())
                    }
                }}
            >
                Read
            </Button>
        </Row>
    )
}
