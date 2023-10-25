import * as R from 'ramda'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// STORE
import { updateCurrentBookId } from '../../store/current/currentSlice'

// COMPONENTS
import Button from '../Button/Button'
import Row from './Row'

// TYPES
import { BookWithIconColorTypes } from '../../store/selector.types'

type BookPropTypes = {
    data?: BookWithIconColorTypes
    index?: number
}

export default function BookRow(props: BookPropTypes) {
    const { data, index } = props
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
                    dispatch(updateCurrentBookId(data.id))
                    navigate('/reading')
                }}
            >
                Read
            </Button>
        </Row>
    )
}
