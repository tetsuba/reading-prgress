import * as R from 'ramda'
import { isArray } from '../../lib/utils'
import { isUndefined, Task } from '../../lib/monads'
import { HistoryTypes } from '../../api/api-types'

export type WordStatusTypes = { word: string; status: string }

type StoryType = string | string[]

export const STATUS = {
    CORRECT: 'green',
    WRONG: 'red'
}

const GREEN = 'green'
const RED = 'red'

export const greaterThanZero = R.gt(R.__, 0)
export const concatFullStop: (val: string) => string = R.concat(R.__, '.')

// EQUALS
const equalsCorrect = R.equals(GREEN)
const equalsWrong = R.equals(RED)

export const toggleStatus = R.ifElse(
    equalsWrong,
    R.always(GREEN),
    R.always(RED)
)

// ALWAYS
const completed = R.always('100% Completed')
const agrIsUndefined = R.always('arg is undefined')

// PROPS
const getPropStatus = R.prop('status')

const notEmptyString = (text: string): boolean => R.not(R.isEmpty(text))

export const removeSpecialCharacter = (word: string) =>
    word.toLowerCase().replace(/^\W/, '').replace(/\W$/, '').replace(/\W$/, '')

const removeSpecialCharacterFromWord = R.compose(
    removeSpecialCharacter,
    R.prop('word')
)

const wordObject = (word: string): WordStatusTypes => ({
    word: word,
    status: ''
})

export function getShortDate(): string {
    return new Date().toLocaleDateString('en-UK')
}

export const filterBySentence = R.filter(notEmptyString)

export const createAListOfWordObjectsFromString = R.compose(
    R.map(wordObject),
    R.filter(notEmptyString),
    R.split(' ')
)

const mapStorySentences = R.map(createAListOfWordObjectsFromString)

export const convertStoryString = R.compose(
    mapStorySentences,
    R.map(concatFullStop),
    filterBySentence,
    R.split(/\./g)
)

export function buildStoryStructure(story: StoryType) {
    return isArray(story)
        ? mapStorySentences(story as string[])
        : convertStoryString(story as string)
}

const statusEqualsCorrect = R.compose(equalsCorrect, getPropStatus)
export const allWordsAreCorrect = R.all(statusEqualsCorrect)

const filterStatusWrong = R.compose(equalsWrong, getPropStatus)

const getWordsFromSentence = R.compose(
    R.map(removeSpecialCharacterFromWord),
    R.filter(filterStatusWrong)
)

export const transformStoryToTrackerHistory = (data: WordStatusTypes[][]) =>
    Task(data)
        .map(R.map(getWordsFromSentence))
        .map(R.flatten)
        .map((words): HistoryTypes[] => [
            {
                words,
                date: getShortDate()
            }
        ])

export function isReadingCompleted(
    storyLength: number,
    count: number
): boolean {
    return greaterThanZero(storyLength) && R.lte(storyLength, count)
    // return !!story.length && story.length <= count
}

function transformArrayToString(words: string[]): string {
    return words.toString().replace(/,/g, ', ')
}

const isGreaterThanZero = R.compose(greaterThanZero, R.prop('length'))
const getWordsFromBookHistory = R.ifElse(
    isGreaterThanZero,
    transformArrayToString,
    completed
)

const wordsReadIncorrectly = (data: string[] | undefined) =>
    isUndefined(data)
        .map(getWordsFromBookHistory)
        .fold(agrIsUndefined, (text) => text)

const moreThanZeroWords = (num: number | undefined) =>
    isUndefined(num).fold(R.F, greaterThanZero)

export const getHistoryWords = R.compose(
    wordsReadIncorrectly,
    R.path(['data', 'words'])
)
export const doesHistoryHaveWords = R.compose(
    moreThanZeroWords,
    R.path(['data', 'words', 'length'])
)
