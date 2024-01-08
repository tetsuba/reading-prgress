import { allBooksCompleted } from '../book-utils'
import { BookTypes } from '../../../api/api-types'

describe('book-utils', () => {
    describe('allBooksCompleted()', () => {
        const booksCompleted: BookTypes[] = [
            {
                id: 1,
                story: [],
                title: '',
                history: [
                    { date: '', words: ['word'] },
                    { date: '', words: [] }
                ]
            },
            {
                id: 1,
                story: [],
                title: '',
                history: [{ date: '', words: [] }]
            },
            {
                id: 1,
                story: [],
                title: '',
                history: [{ date: '', words: [] }]
            }
        ]
        const booksNotCompleted: BookTypes[] = [
            {
                id: 1,
                story: [],
                title: '',
                history: [{ date: '', words: ['word'] }]
            },
            {
                id: 1,
                story: [],
                title: '',
                history: [{ date: '', words: [] }]
            },
            {
                id: 1,
                story: [],
                title: '',
                history: [{ date: '', words: [] }]
            }
        ]
        const booksHistoryNull: BookTypes[] = [
            {
                id: 1,
                story: [],
                title: '',
                history: null
            }
        ]

        test('if all books are completed', () => {
            expect(allBooksCompleted(booksCompleted)).toBeTruthy()
        })
        test('if all books are not completed', () => {
            expect(allBooksCompleted(booksNotCompleted)).toBeFalsy()
        })
        test('if book history is null', () => {
            expect(allBooksCompleted(booksHistoryNull)).toBeFalsy()
        })
    })
})
