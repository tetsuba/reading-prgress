import { ApiCollectionTypes } from '../../api/api-types'
import Loop from '../../Components/Loop/Loop'
import CollectionRow from './CollectionRow'

type PropTypes = {
    collections: ApiCollectionTypes[] | undefined
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
