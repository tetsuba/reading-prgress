import {
    getReadingMistakes,
    removeSpecialCharacters,
    getShortDate,
    updateHistory
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
})
