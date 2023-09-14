import axios, { AxiosResponse } from 'axios'
import {
    ApiGetUserDetailsTypes,
    ApiUserResponseTypes,
    LoginUserTypes
} from './api-types'
import { axiosGet, getBaseUrl } from './api-utils'

const BASE_URL = getBaseUrl()
const URL_USER = `${BASE_URL}/user`
const URL_REGISTER = `${URL_USER}/register?`
const URL_LOGIN = `${URL_USER}/login`

export async function registerUser(
    queryString: string
): Promise<AxiosResponse> {
    return await axios.post(URL_REGISTER + queryString)
}

export async function loginUser(
    json: LoginUserTypes
): Promise<ApiUserResponseTypes> {
    return await axios.post(URL_LOGIN, JSON.stringify(json), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export async function getUserDetails(): Promise<ApiGetUserDetailsTypes> {
    return await axiosGet(URL_USER)
}
