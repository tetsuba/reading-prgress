import {
    removeSpecialCharacter,
    STATUS,
    WordStatusTypes
} from '../../Views/Reading/reading-utils'

export function updateSentence(
    story: WordStatusTypes[][],
    count: number,
    speech: string[]
) {
    return story[count].map((wordObj: WordStatusTypes) => {
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
