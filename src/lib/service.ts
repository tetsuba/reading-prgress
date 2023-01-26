import axios from "axios";

const BASE_URL = 'http://localhost:3001/api/reading/'
// export const BASE_URL = 'http://18.132.193.58:3001/api/reading/'

const URL_REGISTER = BASE_URL + 'user/register?'
const URL_LOGIN = BASE_URL + 'user/login'

export async function registerUser(queryString: string) {
    return await axios.post(URL_REGISTER + queryString)
}

export async function loginUser(json: { [k: string]: string }) {
    // try {
    //     const response = await axios.post(URL_LOGIN, JSON.stringify(json), {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     console.log('loginUser', response)
    //     return response
    // }  catch(e) {
    //     console.log('ERROR: ', e)
    // }

    return await axios.post(URL_LOGIN, JSON.stringify(json), {
        headers: {
            'Content-Type': 'application/json'
        }
    })

}