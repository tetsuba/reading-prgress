import { ApiSightWordsResponseTypes, QueryTypes } from './api-types'
import { attachQueryToUrl, axiosGet, getBaseUrl } from './api-utils'

const BASE_URL: string = getBaseUrl()
const URL_SIGHT_WORDS = `${BASE_URL}/sightWords`

export async function getSightWords(
    props: QueryTypes
): Promise<ApiSightWordsResponseTypes> {
    const url = attachQueryToUrl(URL_SIGHT_WORDS, props.queryKey)
    return await axiosGet(url)
}
