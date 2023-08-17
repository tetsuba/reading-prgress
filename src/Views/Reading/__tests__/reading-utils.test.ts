import {
    removeSpecialCharacter,
    getShortDate,
    buildStoryStructure,
    allWordsAreCorrect,
    STATUS,
    transformStoryToTrackerHistory,
    getHistoryWords,
    doesHistoryHaveWords,
    toggleStatus
} from '../reading-utils'

describe('reading-utils', () => {
    describe('transformStoryToTrackerHistory()', () => {
        test('with status red words', () => {
            const story = [
                [
                    { word: 'This', status: '' },
                    { word: 'is', status: 'red' }
                ],
                [
                    { word: 'Next', status: 'red' },
                    { word: 'sentence.', status: '' }
                ]
            ]
            const words = transformStoryToTrackerHistory(story)
                .concat([])
                .emit()

            console.log(words)
            expect(words[0]).toHaveProperty('words', ['is', 'next'])
        })
        test('with no status red words', () => {
            const story = [
                [
                    { word: 'This', status: '' },
                    { word: 'is', status: '' }
                ],
                [
                    { word: 'Next', status: '' },
                    { word: 'sentence.', status: '' }
                ]
            ]
            const words = transformStoryToTrackerHistory(story)
                .concat([])
                .emit()
            expect(words[0]).toHaveProperty('words', [])
        })
    })
    describe('removeSpecialCharacter()', () => {
        test('to remove special characters from word', () => {
            const result = removeSpecialCharacter('"Bob\'s".')
            expect(result).toEqual("bob's")
        })
    })
    describe('getShortDate()', () => {
        test('to get a short data format', () => {
            expect(getShortDate()).toMatch(/\d{2}\/\d{2}\/\d{4}/)
        })
    })
    describe('buildStoryStructure()', () => {
        const expected = [
            [
                { status: '', word: 'sentence' },
                { status: '', word: 'one.' }
            ],
            [
                { status: '', word: 'sentence' },
                { status: '', word: 'two.' }
            ]
        ]
        test('argument as array', () => {
            const story = ['sentence one.', 'sentence two.']
            expect(buildStoryStructure(story)).toEqual(expected)
        })
        test('argument as string', () => {
            const story = 'sentence one. sentence two.'
            expect(buildStoryStructure(story)).toEqual(expected)
        })
    })
    describe('allWordsAreCorrect()', () => {
        test('all words status are correct', () => {
            const words = [
                [
                    { status: STATUS.CORRECT, word: 'sentence' },
                    { status: STATUS.CORRECT, word: 'one.' }
                ]
            ]
            expect(allWordsAreCorrect(words[0])).toBeTruthy()
        })
        test('all words status are not correct', () => {
            const words = [
                [
                    { status: STATUS.CORRECT, word: 'sentence' },
                    { status: STATUS.WRONG, word: 'one.' }
                ]
            ]
            expect(allWordsAreCorrect(words[0])).toBeFalsy()
        })
        test('all words status are empty string', () => {
            const words = [
                [
                    { status: '', word: 'sentence' },
                    { status: '', word: 'one.' }
                ]
            ]
            expect(allWordsAreCorrect(words[0])).toBeFalsy()
        })
    })
    describe('getHistoryWords()', () => {
        test('data has a list of words', () => {
            const data = {
                data: { date: '', words: ['word', 'something'] }
            }
            expect(getHistoryWords(data)).toEqual('word, something')
        })
        test('data has a list of no words', () => {
            const data = {
                data: { date: '', words: [] }
            }
            expect(getHistoryWords(data)).toEqual('100% Completed')
        })
        test('data is undefined', () => {
            expect(getHistoryWords(undefined)).toEqual('arg is undefined')
        })
    })
})
