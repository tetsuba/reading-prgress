import Loop from '../../Components/Loop/Loop'
import CollectionRow from '../../Components/Row/CollectionRow'
import { CollectionsTypes } from '../../store/selector.types'

type PropTypes = {
    collections: CollectionsTypes[] | undefined
}

export default function ListOfCollections(props: PropTypes) {
    return (
        <div data-testid="collection-list">
            <Loop array={props.collections}>
                <CollectionRow />
            </Loop>
        </div>
    )
}
