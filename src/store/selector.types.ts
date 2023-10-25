import { StateCollectionTypes } from './store.types'
import { ApiBookTypes } from '../api/api-types'

export type BookWithIconColorTypes = Pick<ApiBookTypes, 'id' | 'title'> & {
    iconColor: string
}

export type CollectionWithBooksIconTypes = Pick<
    StateCollectionTypes,
    'title'
> & {
    books: BookWithIconColorTypes[]
}

export type CollectionsTypes = Pick<StateCollectionTypes, 'title' | 'id'> & {
    numberOfBooks: number
    completed: boolean
}
