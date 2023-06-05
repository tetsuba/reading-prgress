import { WordTypes } from './Sentence'
import { StateBookHistoryTypes, StateBookTypes } from '../../store/store-types'
import {ApiBookHistoryTypes, ApiCollectionTypes} from '../../lib/service-types'

export const STATUS = {
    CORRECT: 'green',
    WRONG: 'red'
}

type WordType = {
    word: string
    status: string
}
export function buildStoryStructure(
    story: string | string[]
): WordType[][] | [] {
    return Array.isArray(story)
        ? story.map((sentence) =>
              sentence
                  .split(' ')
                  .filter((word) => word !== '')
                  .map((word) => ({
                      word: word,
                      status: ''
                  }))
          )
        : story // TODO: To be removed when story format is finalized.
              .split(/\./g)
              .filter((sentence) => sentence !== '')
              .map((sentence) => sentence.concat('.'))
              .map((sentence) =>
                  sentence
                      .split(' ')
                      .filter((word) => word !== '')
                      .map((word) => ({
                          word: word,
                          status: ''
                      }))
              )
}

export function allWordsAreCorrect(story: WordType[][], count: number) {
    return story[count].every(
        ({ status }: WordTypes) => status === STATUS.CORRECT
    )
}

export function removeSpecialCharacters(word: string): string {
    return word
        .toLowerCase()
        .replace(/^\W/, '')
        .replace(/\W$/, '')
        .replace(/\W$/, '')
}

export function updateSentence(
    story: WordType[][],
    count: number,
    speech: string[]
) {
    return story[count].map((wordObj: WordTypes) => {
        const word = removeSpecialCharacters(wordObj.word)
        if (speech.includes(word)) {
            return {
                ...wordObj,
                status: STATUS.CORRECT
            }
        }
        return wordObj
    })
}

export function getReadingMistakes(story: WordType[][]): string[] | [] {
    return story
        .map((sentence) =>
            sentence
                .filter(({ status }) => status === 'red')
                .map(({ word }) => removeSpecialCharacters(word))
        )
        .flat()
}

export function getShortDate(): string {
    return new Date().toLocaleDateString('en-UK')
}

export function updateHistory(
    history: StateBookHistoryTypes[],
    story: WordType[][]
) {
    const newHistory = [
        {
            date: getShortDate(),
            words: getReadingMistakes(story)
        }
    ]
    return history.concat(newHistory)
}

export function findBookHistory(
    collections: ApiCollectionTypes[],
    book: StateBookTypes
) {
    // @ts-ignore
    return collections
        .find(({ id }) => id === book.libId)
        .books.find(({ id }) => id === book.bookId).history
}

export function isReadingCompleted(
    story: WordType[][],
    count: number
): boolean {
    return !!story.length && story.length <= count
}

export function prepareTrackerData(
    userId: number,
    book: StateBookTypes,
    story: WordType[][]
) {
    const history = updateHistory(book.history, story)
    return {
        userId,
        bookId: book.bookId,
        libId: book.libId,
        history: history
    }
}

export function wordsFound(data: ApiBookHistoryTypes) {
    return data.words.length > 0
}

function isCompleted(completed: (a: ApiBookHistoryTypes) => boolean) {
    return function wordsReadIncorrectly(data: ApiBookHistoryTypes) {
        return completed(data)
            ? data.words.toString().replace(/,/g, ', ')
            : '100% Completed'
    }
}

export const wordsReadIncorrectly = isCompleted(wordsFound)

