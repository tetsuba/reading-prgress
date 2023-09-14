import axios from 'axios'
import {
    ApiCollectionResponseTypes,
    ApiDashboardResponseTypes,
    ApiUpdateTrackerTypes,
    QueryTypes
} from './api-types'
import ls from '../lib/localStorage'
import { getAuthHeaders } from './api-utils'
import { attachQueryToUrl, axiosGet, getBaseUrl } from './api-utils'

const BASE_URL: string = getBaseUrl()
const URL_TRACKER = `${BASE_URL}/tracker`
const URL_UPDATE = `${URL_TRACKER}/update?`
const URL_WORDS = `${URL_TRACKER}/words`

export async function updateTracker(
    json: ApiUpdateTrackerTypes
): Promise<ApiCollectionResponseTypes> {
    const token = ls.get()
    return await axios.patch(URL_UPDATE, JSON.stringify(json), {
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        }
    })
}

export async function getWords(
    props: QueryTypes
): Promise<ApiDashboardResponseTypes> {
    const url = attachQueryToUrl(URL_WORDS, props.queryKey)
    return await axiosGet(url)
}
