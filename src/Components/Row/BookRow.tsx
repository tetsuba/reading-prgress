import * as R from 'ramda'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getIconColorForBookRow } from '../../Views/Books/book-utils'
import Row from './Row'
import { addBook } from '../../store/book/bookSlice'
import Display from '../Dispay/Display'
import { ApiBookTypes } from '../../api/api-types'
import Button from '../Button/Button'

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
            <Button
                data-testid="book-list-read"
                template="secondary"
                onClick={() => {
                    dispatch(addBook({ book: data, libId: collectionId }))
                    navigate('/reading')
                }}
            >
                Read
            </Button>
            <Display value={collectionId === '001'}>
                <Button
                    className="ml-2"
                    data-testid="book-list-delete"
                    icon="delete"
                    template="icon-delete"
                    onClick={() => deleteBook(data)}
                />
            </Display>
        </Row>
    )
}
