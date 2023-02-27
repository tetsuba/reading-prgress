import axios from 'axios'
import store from '../store/store'
import { updateUser } from '../store/user/userSlice'
import ls from './localStorage'
import { HistoryTypes } from '../store/book/bookSlice'
let origin
/* c8 ignore next 6 */
if (import.meta.env.DEV) {
    origin =
        location.port === '5173' ? 'http://localhost:3001' : location.origin
} else {
    origin = 'http://18.132.193.58:3001'
}

const BASE_URL = `${origin}/api/reading/`

const URL_REGISTER = BASE_URL + 'user/register?'
const URL_LOGIN = BASE_URL + 'user/login'
const URL_USER = BASE_URL + 'user'
const URL_BOOK = BASE_URL + 'book'
const URL_SIGHT_WORDS = BASE_URL + 'sightWords'
const URL_TRACKER = BASE_URL + 'tracker'

export async function registerUser(queryString: string) {
    return await axios.post(URL_REGISTER + queryString)
}

export async function loginUser(json: { [k: string]: string }) {
    return await axios.post(URL_LOGIN, JSON.stringify(json), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// TODO: fix types
export async function getUserDetails(props: any) {
    const [_key, token] = props.queryKey
    const res = await axios.get(URL_USER, {
        headers: { Authorization: `bearer ${token}` }
    })
    if (res.status === 200) {
        store.dispatch(updateUser({ data: res.data, token }))
    }
    return res
}

export async function registerBook(json: { [k: string]: string }) {
    const token = ls.get()
    return await axios.post(`${URL_BOOK}/register`, JSON.stringify(json), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`
        }
    })
}

type GetBookPropTypes = {
    queryKey: string[]
}
export async function getBooks(props: GetBookPropTypes) {
    const token = ls.get()
    const [_key, userId] = props.queryKey
    return await axios.get(`${URL_BOOK}?userId=${userId}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`
        }
    })
}

export async function deleteBook(query: string) {
    const token = ls.get()
    return await axios.delete(`${URL_BOOK}/delete${query}`, {
        headers: {
            Authorization: `bearer ${token}`
        }
    })
}

export async function updateBook(json: { id: number; history: string }) {
    const token = ls.get()
    return await axios.patch(`${URL_BOOK}/update`, JSON.stringify(json), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`
        }
    })
}
export async function getWords(props: GetBookPropTypes) {
    const token = ls.get()
    const [_key, userId] = props.queryKey
    return await axios.get(`${URL_TRACKER}/words?userId=${userId}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`
        }
    })
}

export async function getSightWords(props: GetBookPropTypes) {
    const token = ls.get()
    const [_key, userId] = props.queryKey
    return await axios.get(`${URL_SIGHT_WORDS}?userId=${userId}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`
        }
    })
}

export async function updateTracker(json: {
    userId: number
    libId: string
    bookId: number
    history: HistoryTypes[]
}) {
    console.log('updateTracker:', json)
    const token = ls.get()
    return await axios.patch(`${URL_TRACKER}/update`, JSON.stringify(json), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`
        }
    })
}
