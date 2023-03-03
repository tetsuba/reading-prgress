import { WordTypes } from './Sentence'
import { BookTypes, HistoryTypes } from '../../store/book/bookSlice'
import { CollectionTypes } from '../../store/view/viewSlice'

export const STATUS = {
    CORRECT: 'green',
    WRONG: 'red'
}

type WordType = {
    word: string
    status: string
}
export function buildStoryStructure(story: string): WordType[][] | [] {
    return story
        ? story
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
        : []
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
    history: HistoryTypes[] | null,
    story: WordType[][]
) {
    const newHistory = [
        {
            date: getShortDate(),
            words: getReadingMistakes(story)
        }
    ]
    if (history) {
        return history.concat(newHistory)
    }
    // TODO: Investigate if this is required
    return newHistory
}

export function findBookHistory(
    collections: CollectionTypes[],
    book: BookTypes
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
    book: BookTypes,
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
