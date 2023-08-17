import { WordTypes } from '../../Views/Reading/Sentence'
import {
    removeSpecialCharacter,
    STATUS,
    WordType
} from '../../Views/Reading/reading-utils'

export function updateSentence(
    story: WordType[][],
    count: number,
    speech: string[]
) {
    return story[count].map((wordObj: WordTypes) => {
        const word = removeSpecialCharacter(wordObj.word)
        if (speech.includes(word)) {
            return {
                ...wordObj,
                status: STATUS.CORRECT
            }
        }
        return wordObj
    })
}
