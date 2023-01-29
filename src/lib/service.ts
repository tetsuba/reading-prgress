import axios from 'axios'
import store from '../store/store'
import { updateUser } from '../store/user/userSlice'

const BASE_URL = 'http://localhost:3001/api/reading/'
// export const BASE_URL = 'http://18.132.193.58:3001/api/reading/'

const URL_REGISTER = BASE_URL + 'user/register?'
const URL_LOGIN = BASE_URL + 'user/login'
const URL_USER = BASE_URL + 'user'

export async function registerUser(queryString: string) {
  return await axios.post(URL_REGISTER + queryString)
}

export async function loginUser(json: { [k: string]: string }) {
  return await axios.post(URL_LOGIN, JSON.stringify(json), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function getUserDetails(props) {
  const [_key, token] = props.queryKey
  const res = await axios.get(URL_USER, {
    headers: { Authorization: `bearer ${token}` },
  })
  store.dispatch(updateUser({ data: res.data, token }))
  return res
}
