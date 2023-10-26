import axios, { AxiosError, AxiosResponse } from 'axios'
import ls from '../lib/localStorage'
import CONFIG from './api-config'
import { AuthorizationHeader, QueryTypes } from './api-types'
import { toggleViewGlobalExpired } from '../store/view/viewSlice'
import { AppDispatch } from '../store/store.types'

export function getAuthHeaders(): AuthorizationHeader {
    const token = ls.get()
    return {
        Authorization: `bearer ${token}`
    }
}

/* c8 ignore start */
export function getOrigin(): string {
    return import.meta.env.DEV
        ? CONFIG.LOCATION.DEV
        : CONFIG.LOCATION.PRODUCTION
}
/* c8 ignore end */

export function getBaseUrl(): string {
    const ORIGIN: string = getOrigin()
    return `${ORIGIN}/api/reading`
}

export async function axiosGet(url: string): Promise<AxiosResponse> {
    return await axios.get(url, {
        headers: getAuthHeaders()
    })
}

export function attachQueryToUrl(
    url: string,
    queryKey: QueryTypes['queryKey']
) {
    const [_key, userId] = queryKey
    return `${url}?userId=${userId}`
}

// TODO: how to fix store types and implement test
/* c8 ignore start */
export function setupAxiosInterceptors(store: { dispatch: AppDispatch }) {
    return axios.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error: AxiosError) => {
            if (error.response?.status === 401) {
                // Unauthorized
                console.log('interceptors [Unauthorized]')
                store.dispatch(toggleViewGlobalExpired(true))
            }
            return Promise.reject(error)
        }
    )
}
/* c8 ignore end */
