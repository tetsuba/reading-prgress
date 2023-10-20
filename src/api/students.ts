import axios from 'axios'
import {
    ApiCollectionResponseTypes,
    ApiStudentResponseTypes,
    JsonRegisterStudentTypes,
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
const URL_STUDENT = `${BASE_URL}/student`
const URL_REGISTER = `${URL_STUDENT}/register`
const URL_DELETE = `${URL_STUDENT}/delete`
const URL_UPDATE = `${URL_STUDENT}/update`

export async function registerStudent(
    json: JsonRegisterStudentTypes
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

export async function updateStudent(
    json: JsonStudentTypes
): Promise<ApiStudentResponseTypes> {
    return await axios.patch(URL_UPDATE, JSON.stringify(json), {
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        }
    })
}
