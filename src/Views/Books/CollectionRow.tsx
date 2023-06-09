import { ApiCollectionTypes } from '../../lib/service-types'
import { useDispatch } from 'react-redux'
import Row from '../../Components/Row/Row'
import { ViewBooksButton } from '../../Components/Button/Buttons'
import { updateViewBookCollection } from '../../store/view/viewSlice'

type CollectionPropTypes = {
    data?: ApiCollectionTypes | undefined
    index?: number
}

export default function CollectionRow(props: CollectionPropTypes) {
    const dispatch = useDispatch()
    const { data, index = 0 } = props
    const text = props.data
        ? `${props.data.title} (${props.data.books.length})`
        : ''
    return (
        <Row index={index} text={text} iconColor="" icon="library">
            <ViewBooksButton
                onClick={() => data && dispatch(updateViewBookCollection(data))}
            />
        </Row>
    )
}
