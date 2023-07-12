import {
    getReadingMistakes,
    removeSpecialCharacters,
    getShortDate,
    updateHistory,
    buildStoryStructure,
    allWordsAreCorrect,
    STATUS,
    updateSentence,
    wordsFound
} from '../reading-utils'

describe('reading-utils', () => {
    describe('removeSpecialCharacters()', () => {
        test('to remove special characters from word', () => {
            const result = removeSpecialCharacters('"Bob\'s".')
            expect(result).toEqual("bob's")
        })
    })
    describe('getReadingMistakes()', () => {
        test('with no reading mistakes', () => {
            const sentences = [
                [
                    { word: 'this', status: '' },
                    { word: 'this', status: '' }
                ],
                [
                    { word: 'when', status: '' },
                    { word: 'where', status: '' }
                ]
            ]
            const result = getReadingMistakes(sentences)
            expect(result).toEqual([])
        })
        test('with reading mistakes', () => {
            const sentences = [
                [
                    { word: 'this', status: 'red' },
                    { word: 'this', status: '' }
                ],
                [
                    { word: 'when', status: '' },
                    { word: 'where', status: 'red' }
                ]
            ]
            const result = getReadingMistakes(sentences)
            expect(result).toEqual(['this', 'where'])
        })
    })
    describe('getShortDate()', () => {
        test('to get a short data format', () => {
            expect(getShortDate()).toMatch(/\d{2}\/\d{2}\/\d{4}/)
        })
    })
    describe('updateHistory()', () => {
        const story = [
            [
                { word: 'this', status: 'red' },
                { word: 'this', status: '' }
            ],
            [
                { word: 'when', status: '' },
                { word: 'where', status: 'red' }
            ]
        ]
        const history = [{ date: '12/12/2020', words: ['while'] }]

        test('with history', () => {
            expect(updateHistory(history, story)).toHaveLength(2)
        })

        test('with no history', () => {
            expect(updateHistory([], story)).toHaveLength(1)
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
            expect(allWordsAreCorrect(words, 0)).toBeTruthy()
        })
        test('all words status are not correct', () => {
            const words = [
                [
                    { status: STATUS.CORRECT, word: 'sentence' },
                    { status: STATUS.WRONG, word: 'one.' }
                ]
            ]
            expect(allWordsAreCorrect(words, 0)).toBeFalsy()
        })
        test('all words status are empty string', () => {
            const words = [
                [
                    { status: '', word: 'sentence' },
                    { status: '', word: 'one.' }
                ]
            ]
            expect(allWordsAreCorrect(words, 0)).toBeFalsy()
        })
    })
    describe('updateSentence()', () => {
        test('speech to match a word', () => {
            const words = [
                [
                    { status: '', word: 'sentence' },
                    { status: '', word: 'one.' }
                ]
            ]
            const speech = ['one', '']
            const expected = [
                { status: '', word: 'sentence' },
                { status: STATUS.CORRECT, word: 'one.' }
            ]
            expect(updateSentence(words, 0, speech)).toEqual(expected)
        })
        test('speech not to match a word', () => {
            const words = [
                [
                    { status: '', word: 'sentence' },
                    { status: '', word: 'one.' }
                ]
            ]
            const speech = ['five', '']
            const expected = [
                { status: '', word: 'sentence' },
                { status: '', word: 'one.' }
            ]
            expect(updateSentence(words, 0, speech)).toEqual(expected)
        })
    })
    describe('wordsFound()', () => {
        test('should find a word', () => {
            const data = { date: '', words: ['word'] }
            expect(wordsFound(data)).toBeTruthy()
        })
        test('should not find a word', () => {
            const data = { date: '', words: [] }
            expect(wordsFound(data)).toBeFalsy()
        })
        test('argument to be undefined', () => {
            expect(wordsFound(undefined)).toBeFalsy()
        })
    })
})
