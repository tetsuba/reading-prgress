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
    const iconColor = getIconColorForBookRow(data?.history)
    return (
        <Row
            index={index || 0}
            text={data?.title}
            icon="bookmark"
            iconColor={iconColor}
        >
            <ReadBookButton
                onClick={() => {
                    if (data && collectionId) {
                        dispatch(addBook({ book: data, libId: collectionId }))
                        navigate('/reading')
                    }
                }}
            />
            <Display value={props.collectionId === '001'}>
                <DeleteBookButton
                    onClick={() => data && deleteBook && deleteBook(data)}
                />
            </Display>
        </Row>
    )
}
