import moment from 'moment'
import { HeatMapWordTypes } from '../Components/HeatMap/HeatMap'

export const DATE_FORMAT = 'DD/MM/YYYY'

export function formatDate(date: string) {
    return moment(date, DATE_FORMAT)
}

export function dateIsAfterOne(
    unit: moment.unitOfTime.DurationConstructor,
    date: string
) {
    const oneWeek = moment().subtract(1, unit)
    return moment(date, DATE_FORMAT).isAfter(oneWeek)
}

export function countDuplicates(words: string[]): HeatMapWordTypes[] | [] {
    return words
        .filter((word) => word !== '')
        .reduce((acc: HeatMapWordTypes[] | [], word) => {
            const update = acc.some((obj) => obj.word === word)
            if (update) {
                acc.forEach((obj, i) => {
                    if (obj.word === word) {
                        acc[i] = { ...obj, index: obj.index + 1 }
                    }
                })
            } else {
                ;(acc as HeatMapWordTypes[]).push({ word, index: 1 })
            }
            return acc
        }, [])
}
