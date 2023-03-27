import axios from 'axios'
import store from '../store/store'
import { updateUser } from '../store/user/userSlice'
import ls from './localStorage'
import { toggleViewGlobalExpired } from '../store/view/viewSlice'
import {
    ApiCollectionResponseTypes,
    ApiDashboardResponseTypes,
    ApiGetUserDetailsTypes,
    ApiSightWordsResponseTypes,
    ApiUpdateTrackerTypes,
    ApiUserResponseTypes
} from './service-types'

let origin
/* c8 ignore next 6 */
if (import.meta.env.DEV) {
    origin =
        location.port === '5173' ? '//localhost:3001' : location.origin
} else {
    origin = '//api.tetsuba.link'
}

const BASE_URL = `${origin}/api/reading/`

const URL_REGISTER = BASE_URL + 'user/register?'
const URL_LOGIN = BASE_URL + 'user/login'
const URL_USER = BASE_URL + 'user'
const URL_BOOK = BASE_URL + 'book'
const URL_SIGHT_WORDS = BASE_URL + 'sightWords'
const URL_TRACKER = BASE_URL + 'tracker'
const URL_TRACKER_WORDS = URL_TRACKER + '/words'

type ErrorTypes = {
    response: {
        status: number
    }
}

/* c8 ignore next 14 */
axios.interceptors.response.use(
    function (response) {
        return response
    },
    function (error: ErrorTypes) {
        if (error.response.status === 401) {
            // Unauthorized
            store.dispatch(toggleViewGlobalExpired(true))
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error)
    }
)

export async function registerUser(queryString: string) {
    return await axios.post(URL_REGISTER + queryString)
}

export async function loginUser(json: {
    [k: string]: string | undefined
}): Promise<ApiUserResponseTypes> {
    return await axios.post(URL_LOGIN, JSON.stringify(json), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

async function axiosGet(url: string) {
    const token = ls.get()
    return await axios.get(url, {
        headers: {
            Authorization: `bearer ${token}`
        }
    })
}

export async function getUserDetails() {
    const res: ApiGetUserDetailsTypes = await axiosGet(URL_USER)
    if (res.status === 200) {
        const token = ls.get()
        store.dispatch(updateUser({ data: res.data, token }))
    }
    return res
}

type QueryTypes = {
    queryKey: (string | number)[]
}

function attachQueryToUrl(url: string, queryKey: QueryTypes['queryKey']) {
    const [_key, userId] = queryKey
    return `${url}?userId=${userId}`
}

export async function getBooks(
    props: QueryTypes
): Promise<ApiCollectionResponseTypes> {
    const url = attachQueryToUrl(URL_BOOK, props.queryKey)
    return await axiosGet(url)
}

export async function getWords(
    props: QueryTypes
): Promise<ApiDashboardResponseTypes> {
    const url = attachQueryToUrl(URL_TRACKER_WORDS, props.queryKey)
    return await axiosGet(url)
}

export async function getSightWords(
    props: QueryTypes
): Promise<ApiSightWordsResponseTypes> {
    const url = attachQueryToUrl(URL_SIGHT_WORDS, props.queryKey)
    return await axiosGet(url)
}

export async function registerBook(json: {
    [k: string]: string | number | undefined
}): Promise<ApiCollectionResponseTypes> {
    const token = ls.get()
    return await axios.post(`${URL_BOOK}/register`, JSON.stringify(json), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`
        }
    })
}

export async function deleteBook(
    query: string
): Promise<ApiCollectionResponseTypes> {
    const token = ls.get()
    return await axios.delete(`${URL_BOOK}/delete${query}`, {
        headers: {
            Authorization: `bearer ${token}`
        }
    })
}

export async function updateTracker(
    json: ApiUpdateTrackerTypes
): Promise<ApiCollectionResponseTypes> {
    const token = ls.get()
    return await axios.patch(`${URL_TRACKER}/update`, JSON.stringify(json), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`
        }
    })
}
