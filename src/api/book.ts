import axios from 'axios'
import {
    ApiCollectionResponseTypes,
    AuthorizationHeader,
    QueryTypes,
    RegisterBookTypes
} from './api-types'
import {
    attachQueryToUrl,
    axiosGet,
    getAuthHeaders,
    getBaseUrl
} from './api-utils'

const BASE_URL = getBaseUrl()
const URL_BOOK = `${BASE_URL}/book`
const URL_REGISTER = `${URL_BOOK}/register?`
const URL_DELETE = `${URL_BOOK}/delete`

export async function getBooks(
    props: QueryTypes
): Promise<ApiCollectionResponseTypes> {
    const url = attachQueryToUrl(URL_BOOK, props.queryKey)
    return await axiosGet(url)
}

export async function registerBook(
    json: RegisterBookTypes
): Promise<ApiCollectionResponseTypes> {
    return await axios.post(URL_REGISTER, JSON.stringify(json), {
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        }
    })
}

export async function deleteBook(
    bookId: number
): Promise<ApiCollectionResponseTypes> {
    return await axios.delete(`${URL_DELETE}?bookId=${bookId}`, {
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        }
    })
}
