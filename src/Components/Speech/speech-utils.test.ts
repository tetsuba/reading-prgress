import { STATUS } from '../../Views/Reading/reading-utils'
import { updateSentence } from './speech-utils'

describe('', () => {
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
})
