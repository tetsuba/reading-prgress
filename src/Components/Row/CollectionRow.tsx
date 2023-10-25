import * as R from 'ramda'
import { useDispatch } from 'react-redux'

// TYPES
import { CollectionsTypes } from '../../store/selector.types'

// STORE
import { updateCurrentCollectionId } from '../../store/current/currentSlice'

// COMPONENTS
import Row from './Row'
import Button from '../Button/Button'

export type CollectionPropTypes = {
    data?: CollectionsTypes | undefined
    index?: number
}

export default function CollectionRow(props: CollectionPropTypes) {
    const dispatch = useDispatch()
    const { data, index = 0 } = props

    if (R.isNil(data)) return <>loading...</>

    const text = `${data.title} (${data.numberOfBooks})`
    const iconColour = data.completed ? 'text-green-500' : ''

    return (
        <Row index={index} text={text} iconColor={iconColour} icon="library">
            <Button
                className="flex items-center"
                data-testid="collection-button"
                icon="eye"
                template={`${data.completed ? 'disabled' : 'secondary'}`}
                onClick={() => dispatch(updateCurrentCollectionId(data.id))}
                right
            >
                <span className="mr-1 hidden md:inline">View Books</span>
            </Button>
        </Row>
    )
}
