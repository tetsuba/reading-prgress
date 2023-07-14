import { ApiCollectionTypes } from '../../api/api-types'
import { useDispatch } from 'react-redux'
import Row from '../../Components/Row/Row'
import { ViewBooksButton } from '../../Components/Button/Buttons'
import { updateViewBookCollection } from '../../store/view/viewSlice'
import { allBooksCompleted } from './book-utils'

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
    const completed = allBooksCompleted(data?.books)
    const iconColour = completed ? 'text-green-500' : ''

    return (
        <Row index={index} text={text} iconColor={iconColour} icon="library">
            <ViewBooksButton
                inactive={completed}
                onClick={() => data && dispatch(updateViewBookCollection(data))}
            />
        </Row>
    )
}
