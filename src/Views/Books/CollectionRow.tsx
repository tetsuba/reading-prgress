import { ApiCollectionTypes } from '../../api/api-types'
import { useDispatch } from 'react-redux'
import Row from '../../Components/Row/Row'
import { ViewBooksButton } from '../../Components/Button/Buttons'
import { updateViewBookCollection } from '../../store/view/viewSlice'
import { allBooksCompleted, collectionTitle, numberOfBooks } from './book-utils'

export type CollectionPropTypes = {
    data?: ApiCollectionTypes | undefined
    index?: number
}

export default function CollectionRow(props: CollectionPropTypes) {
    const dispatch = useDispatch()
    const { data, index = 0 } = props
    const text = `${collectionTitle(props)} ${numberOfBooks(props)}`
    const completed = allBooksCompleted(data)
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
