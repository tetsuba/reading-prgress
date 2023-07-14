import { allBooksCompleted, getBookStatusColour } from '../book-utils'

describe('book-utils', () => {
    describe('getBookStatusColour()', () => {
        test('should return gray', () => {
            expect(getBookStatusColour(undefined)).toEqual('text-gray-300')
        })
        test('should return green', () => {
            const history = [{ date: '12/12/2222', words: [] }]
            expect(getBookStatusColour(history)).toEqual('text-green-500')
        })
        test('should return red', () => {
            const history = [{ date: '12/12/2222', words: ['there'] }]
            expect(getBookStatusColour(history)).toEqual('text-red-500')
        })
    })
    describe('allBooksCompleted()', () => {
        const booksCompleted = [
            {
                id: 1,
                story: [],
                title: '',
                userId: 1,
                history: [
                    { date: '', words: ['word'] },
                    { date: '', words: [] }
                ]
            },
            {
                id: 1,
                story: [],
                title: '',
                userId: 1,
                history: [{ date: '', words: [] }]
            },
            {
                id: 1,
                story: [],
                title: '',
                userId: 1,
                history: [{ date: '', words: [] }]
            }
        ]
        const booksNotCompleted = [
            {
                id: 1,
                story: [],
                title: '',
                userId: 1,
                history: [{ date: '', words: ['word'] }]
            },
            {
                id: 1,
                story: [],
                title: '',
                userId: 1,
                history: [{ date: '', words: [] }]
            },
            {
                id: 1,
                story: [],
                title: '',
                userId: 1,
                history: [{ date: '', words: [] }]
            }
        ]
        test('if all books are completed', () => {
            expect(allBooksCompleted(booksCompleted)).toBeTruthy()
        })
        test('if all books are not completed', () => {
            expect(allBooksCompleted(booksNotCompleted)).toBeFalsy()
        })
    })
})
