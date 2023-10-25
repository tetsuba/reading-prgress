import {
    ApiBookHistoryTypes,
    ApiCollectionTypes,
    ApiProgressType,
    ApiStudentType
} from '../api/api-types'
import store from './store'

export type ActionTypes = {
    type: string
}

export type StateBookHistoryTypes = ApiBookHistoryTypes
export type StateBooksTypes = ApiCollectionTypes[]
export type StateStudentTypes = ApiStudentType
export type StateCollectionTypes = ApiCollectionTypes
export type StateProgressTypes = ApiProgressType

export type StateBookTypes = {
    bookId: number
    libId: string
    history: StateBookHistoryTypes[] | []
    story: string | string[]
    title: string
}

export type StateUserTypes = {
    firstName: string
    lastName: string
    email: string
    id: number
    token: string
}

export type StateViewGlobalTypes = {
    expired: boolean
}

export type StateViewTypes = {
    global: StateViewGlobalTypes
    books: {
        showMessage: boolean
    }
}

export type StateCurrentTypes = {
    studentId: number | null
    collectionId: string | null
    bookId: number | null
}

export type StateTypes = {
    books: StateBooksTypes
    current: StateCurrentTypes
    students: StateStudentTypes[]
    user: StateUserTypes
    view: StateViewTypes
}

export type AppDispatch = typeof store.dispatch

export type ReadWordsTypes = {
    word: string
    index: number
}

export type StudentProgressReadWordsTypes = {
    oneWeekAgo: ReadWordsTypes[] | string[]
    oneMonthAgo: ReadWordsTypes[] | string[]
    history: ReadWordsTypes[] | string[]
}
