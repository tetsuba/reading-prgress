import * as R from 'ramda'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// UTILS
import { getIconColorForBookRow } from '../../Views/Books/book-utils'

// STORE
import { updateCurrentBookId } from '../../store/current/currentSlice'

// COMPONENTS
import Button from '../Button/Button'
import Row from './Row'

// TYPES
import { ApiBookTypes } from '../../api/api-types'

type BookPropTypes = {
    data?: ApiBookTypes
    index?: number
    collectionId?: string
}

export default function BookRow(props: BookPropTypes) {
    const { data, index, collectionId } = props
    const dispatch = useDispatch()
    const navigate = useNavigate()

    if (R.isNil(data) || R.isNil(collectionId) || R.isNil(index)) {
        return <>loading...</>
    }

    const iconColor = getIconColorForBookRow(data)
    return (
        <Row
            index={index}
            text={data.title}
            icon="bookmark"
            iconColor={iconColor}
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
