import axios, { AxiosResponse } from 'axios'
import {
    ApiResponseLoginTypes,
    ApiResponseUserDetailsTypes,
    BaseUrlType,
    LoginUserTypes
} from './api-types'
import { axiosGet, getBaseUrl } from './api-utils'

const URL_USER: `${BaseUrlType}/user` = `${getBaseUrl()}/user`
const URL_REGISTER: `${typeof URL_USER}/register` = `${URL_USER}/register`
const URL_LOGIN: `${typeof URL_USER}/login` = `${URL_USER}/login`

export async function registerUser(
    queryString: string
): Promise<AxiosResponse> {
    return await axios.post(`${URL_REGISTER}?${queryString}`)
}

export async function loginUser(
    json: LoginUserTypes
): Promise<ApiResponseLoginTypes> {
    return await axios.post(URL_LOGIN, JSON.stringify(json), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export async function getUserDetails(): Promise<ApiResponseUserDetailsTypes> {
    return await axiosGet(URL_USER)
}
