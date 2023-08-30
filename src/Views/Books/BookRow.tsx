import * as R from 'ramda'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getIconColorForBookRow } from './book-utils'
import Row from '../../Components/Row/Row'
import {
    DeleteBookButton,
    ReadBookButton
} from '../../Components/Button/Buttons'
import { addBook } from '../../store/book/bookSlice'
import Display from '../../Components/Dispay/Display'
import { ApiBookTypes } from '../../api/api-types'

type BookPropTypes = {
    data?: ApiBookTypes
    index?: number
    collectionId?: string
    deleteBook?: (book: ApiBookTypes) => void
}

export default function BookRow(props: BookPropTypes) {
    const { data, index, collectionId, deleteBook } = props
    const dispatch = useDispatch()
    const navigate = useNavigate()

    if (
        R.isNil(data) ||
        R.isNil(deleteBook) ||
        R.isNil(collectionId) ||
        R.isNil(index)
    ) {
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
            <ReadBookButton
                onClick={() => {
                    dispatch(addBook({ book: data, libId: collectionId }))
                    navigate('/reading')
                }}
            />
            <Display value={collectionId === '001'}>
                <DeleteBookButton onClick={() => deleteBook(data)} />
            </Display>
        </Row>
    )
}
