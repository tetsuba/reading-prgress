import { StateCollectionTypes } from './store.types'
import { ApiTypes, BookTypes } from '../api/api-types'

type SelectorTypes = {
    iconColor: string
    numberOfBooks: number
    completed: boolean
}

export type SelectorBookTypes = Pick<BookTypes, 'id' | 'title'> &
    Pick<SelectorTypes, 'iconColor'>

export type SelectorCollectionTypes = Pick<StateCollectionTypes, 'title'> &
    Record<'books', SelectorBookTypes[]>

export type SelectorCollectionsTypes = Pick<
    StateCollectionTypes,
    'title' | 'id'
> &
    Pick<SelectorTypes, 'numberOfBooks' | 'completed'>

export type SelectorStudentLastProgressTypes =
    | undefined
    | Array<
          Pick<ApiTypes, 'collectionId' | 'bookId' | 'date'> &
              Pick<SelectorTypes, 'completed'>
      >
