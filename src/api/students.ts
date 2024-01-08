import axios from 'axios'
import {
    ApiResponseStudentTypes,
    ApiPayloadStudentTypes,
    ApiPayloadUpdateStudentTypes,
    BaseUrlType
} from './api-types'
import { getAuthHeaders, getBaseUrl } from './api-utils'

const URL_STUDENT: `${BaseUrlType}/student` = `${getBaseUrl()}/student`
const URL_REGISTER: `${typeof URL_STUDENT}/register` = `${URL_STUDENT}/register`
const URL_DELETE: `${typeof URL_STUDENT}/delete` = `${URL_STUDENT}/delete`
const URL_UPDATE: `${typeof URL_STUDENT}/update` = `${URL_STUDENT}/update`

export async function registerStudent(
    json: ApiPayloadStudentTypes
): Promise<ApiResponseStudentTypes> {
    return await axios.post(URL_REGISTER, JSON.stringify(json), {
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        }
    })
}

export async function deleteStudent(
    studentId: number
): Promise<ApiResponseStudentTypes> {
    return await axios.delete(`${URL_DELETE}?studentId=${studentId}`, {
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        }
    })
}

export async function updateStudent(
    json: ApiPayloadUpdateStudentTypes
): Promise<ApiResponseStudentTypes> {
    return await axios.patch(URL_UPDATE, JSON.stringify(json), {
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        }
    })
}
