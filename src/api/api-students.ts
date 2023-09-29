import axios from 'axios'
import {
    ApiCollectionResponseTypes,
    ApiStudentResponseTypes,
    JsonStudentTypes,
    QueryTypes
} from './api-types'
import {
    attachQueryToUrl,
    axiosGet,
    getAuthHeaders,
    getBaseUrl
} from './api-utils'

const BASE_URL = getBaseUrl()
const URL_BOOK = `${BASE_URL}/student`
const URL_REGISTER = `${URL_BOOK}/register`
const URL_DELETE = `${URL_BOOK}/delete`
const URL_UPDATE = `${URL_BOOK}/update`

export async function getBooks(
    props: QueryTypes
): Promise<ApiCollectionResponseTypes> {
    const url = attachQueryToUrl(URL_BOOK, props.queryKey)
    return await axiosGet(url)
}

export async function registerStudent(
    json: JsonStudentTypes
): Promise<ApiStudentResponseTypes> {
    return await axios.post(URL_REGISTER, JSON.stringify(json), {
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        }
    })
}

export async function deleteStudent(
    studentId: number
): Promise<ApiStudentResponseTypes> {
    return await axios.delete(`${URL_DELETE}?studentId=${studentId}`, {
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        }
    })
}
