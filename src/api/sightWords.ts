import {
    ApiResponseSightWordsTypes,
    BaseUrlType,
    QueryTypes
} from './api-types'
import { attachQueryToUrl, axiosGet, getBaseUrl } from './api-utils'

const URL_SIGHT_WORDS: `${BaseUrlType}/sightWords` = `${getBaseUrl()}/sightWords`

export async function getSightWords(
    props: QueryTypes
): Promise<ApiResponseSightWordsTypes> {
    const url = attachQueryToUrl(URL_SIGHT_WORDS, props.queryKey)
    return await axiosGet(url)
}
