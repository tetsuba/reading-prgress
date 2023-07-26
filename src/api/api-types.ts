export type ApiBookHistoryTypes = {
    date: string
    words: string[]
}

export type ApiBookTypes = {
    id: number
    story: string | string[]
    title: string
    userId: number
    history: ApiBookHistoryTypes[] | null
}

export type ApiCollectionTypes = {
    author: string
    books: ApiBookTypes[]
    description: string
    id: string
    title: string
}

export type ApiCollectionResponseTypes = {
    data: ApiCollectionTypes[]
}

export type ApiUpdateTrackerTypes = {
    userId: ApiBookTypes['userId']
    libId: ApiCollectionTypes['id']
    bookId: ApiBookTypes['id']
    history: ApiBookHistoryTypes[]
}

export type ApiUserTypes = {
    firstName: string
    lastName: string
    email: string
    id: number
}

export type ApiUserResponseTypes = {
    data: {
        data: ApiUserTypes
        token: string
    }
}

export type ApiGetUserDetailsTypes = {
    status: number
    data: ApiUserTypes
}

export type ApiWordTypes = {
    word: string
    index: number
}

export type ApiSightWordsTypes = {
    sightWordsReadWrong: ApiWordTypes[]
    sightWordsReadInBooks: ApiWordTypes[]
    sightWordsFromBooks: ApiWordTypes[]
    sightWordsNotInBooks: ApiWordTypes[]
}

export type ApiSightWordsResponseTypes = {
    data: ApiSightWordsTypes
}

export type ApiDashboardLastBookReadTypes = {
    date: string
    title: string
    words: string[]
}

export type ApiDashboardResponseTypes = {
    data: {
        lastBookRead: ApiDashboardLastBookReadTypes[]
        readIncorrectly: {
            oneWeekAgo: ApiWordTypes[]
            oneMonthAgo: ApiWordTypes[]
            history: ApiWordTypes[]
        }
    }
}

export type RegisterBookTypes = {
    userId: number
    title: string | undefined
    story: string[] | undefined
}

export type QueryTypes = {
    queryKey: (string | number)[]
}

export type ErrorTypes = {
    response: {
        status: number
    }
}

export type AuthorizationHeader = {
    Authorization: string
}

export type LoginUserTypes = {
    username: string | undefined
    password: string | undefined
}
