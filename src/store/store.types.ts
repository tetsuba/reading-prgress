import store from './store'
import {
    ProgressType,
    StudentType,
    UserTypes,
    TokenType,
    CollectionTypes,
    ApiTypes
} from '../api/api-types'

export type AppDispatch = typeof store.dispatch
export type ActionTypes = { type: string }

// BOOKS
export type StateBooksTypes = CollectionTypes[]
export type ActionUpdateBooksTypes = ActionTypes &
    Record<'payload', CollectionTypes[]>
export type StateCollectionTypes = CollectionTypes

// CURRENT
export type StateCurrentTypes = Record<
    keyof Pick<ApiTypes, 'studentId' | 'bookId'>,
    number | null
> &
    Record<keyof Pick<ApiTypes, 'collectionId'>, string | null>
export type ActionUpdateCurrentStudentIdTypes = ActionTypes &
    Record<'payload', StateCurrentTypes['studentId']>
export type ActionUpdateCurrentCollectionIdTypes = ActionTypes &
    Record<'payload', StateCurrentTypes['collectionId']>
export type ActionUpdateCurrentBookIdTypes = ActionTypes &
    Record<'payload', StateCurrentTypes['bookId']>

// STUDENTS
export type StateStudentTypes = StudentType
export type ActionAddStudentTypes = ActionTypes &
    Record<'payload', StateStudentTypes[]>

export type StateProgressTypes = ProgressType

// USER
export type StateUserTypes = UserTypes & TokenType
export type ActionUserUpdateTypes = ActionTypes &
    Record<'payload', Record<'user', UserTypes> & TokenType>

// VIEW
export type StateViewTypes = {
    global: { expired: boolean }
    books: { showMessage: boolean }
}
export type ActionViewGlobalExpiredToggleTypes = ActionTypes &
    Record<'payload', boolean>

// Main State
export type StateTypes = {
    books: StateBooksTypes
    current: StateCurrentTypes
    students: StateStudentTypes[]
    user: StateUserTypes
    view: StateViewTypes
}
