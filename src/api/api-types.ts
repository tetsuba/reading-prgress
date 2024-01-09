import CONFIG from './api-config'

export type ApiTypes = {
    author: string
    bookId: number
    collectionId: string
    date: string
    description: string
    dob: string
    email: string
    firstName: string
    id: number
    index: number
    lastName: string
    password: string
    story: string[]
    studentId: number
    title: string
    token: string
    userId: number
    username: string
    word: string
    words: string[]
}

type StudentNameProperties = keyof Pick<ApiTypes, 'firstName' | 'lastName'>

type StudentNameTypes = Record<Lowercase<StudentNameProperties>, string>

export type TokenType = Pick<ApiTypes, 'token'>

export type HistoryTypes = Pick<ApiTypes, 'date' | 'words'>

export type UserTypes = Pick<
    ApiTypes,
    'email' | 'id' | 'firstName' | 'lastName'
>

export type BookTypes = Pick<ApiTypes, 'story' | 'title' | 'id'> &
    Record<'history', HistoryTypes[] | null>

export type BooksTypes = Record<'books', BookTypes[]>

export type ProgressType = Pick<ApiTypes, 'collectionId' | 'bookId'> &
    Record<'history', HistoryTypes[]>

export type CollectionTypes = Pick<
    ApiTypes,
    'author' | 'description' | 'title'
> &
    BooksTypes & {
        id: string // Collection id is string not a number.
    }

export type StudentType = Pick<ApiTypes, 'studentId' | 'dob'> &
    StudentNameTypes &
    Record<'progress', ProgressType[]>

export type WordTypes = Pick<ApiTypes, 'word' | 'index'>

export type LoginUserTypes = Pick<ApiTypes, 'username' | 'password'>

export type SightWordsTypes = {
    sightWordsReadWrong: WordTypes[]
    sightWordsReadInBooks: WordTypes[]
    sightWordsFromBooks: WordTypes[]
    sightWordsNotInBooks: WordTypes[]
}

type ResponseUserTypes = {
    user: UserTypes
    books: CollectionTypes[]
    students: StudentType[] | []
}

export type ApiResponseLoginTypes = Record<
    'data',
    TokenType & ResponseUserTypes
>

export type ApiResponseUserDetailsTypes = Record<'data', ResponseUserTypes>

export type ApiResponseSightWordsTypes = Record<'data', SightWordsTypes>

export type ApiResponseStudentTypes = Record<'data', StudentType[]>

export type ApiPayloadStudentTypes = Pick<ApiTypes, 'dob' | 'studentId'> &
    StudentNameTypes

export type ApiPayloadUpdateStudentTypes = ApiPayloadStudentTypes & {
    progress: string
}

export type QueryTypes = {
    queryKey: (string | number)[]
}

export type AuthorizationHeader = {
    Authorization: string
}

export type OriginType = typeof CONFIG.LOCATION[keyof typeof CONFIG.LOCATION]

export type BaseUrlType = `${OriginType}/api/reading`
