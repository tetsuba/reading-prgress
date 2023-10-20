import moment from 'moment'
import { DATE_FORMAT } from '../../src/store/store.utils'

const zeroDays = () => moment().subtract(0, 'd').format(DATE_FORMAT)
const twoDays = () => moment().subtract(2, 'd').format(DATE_FORMAT)
const threeDays = () => moment().subtract(3, 'd').format(DATE_FORMAT)
const twoWeeks = () => moment().subtract(2, 'w').format(DATE_FORMAT)
const twoMonths = () => moment().subtract(2, 'M').format(DATE_FORMAT)

const HISTORY_NO_MISTAKES = { words:[], date: zeroDays() }

const PROGRESS_FIRST_UPDATE = {
    collectionId: "001",
    bookId:1,
    history:[ HISTORY_NO_MISTAKES ]
}

export const STUDENT_1 = {
    studentId: 1,
    firstname: 'John',
    lastname: 'Bob',
    dob: '2011-06-11',
    progress: null
}

export const STUDENT_1__FIRST_UPDATE = {
    ...STUDENT_1,
    progress: [PROGRESS_FIRST_UPDATE]
}

const STUDENT_2 = {
    studentId: 2,
    firstname: 'Bob',
    lastname: 'Billy',
    dob: '2016-08-03',
    progress: null
}

const PROGRESS_BOOK_1 = {
    collectionId: '002',
    bookId: 1,
    history: [
        {
            words: [],
            date: twoMonths()
        },
        {
            words: ['mad'],
            date: twoMonths()
        },
        {
            words: ['dan', 'mad', 'it'],
            date: twoMonths()
        },
        {
            words: ['sid'],
            date: twoWeeks()
        },
        {
            words: [
                'am',
                'sid',
                'am',
                'dan',
                'is',
                'sad',
                'is',
                'mad',
                'it',
                'sid',
                'is',
                'pip',
                'did'
            ],
            date: threeDays()
        }
    ]
}
const PROGRESS_BOOK_2 = {
    collectionId: '002',
    bookId: 2,
    history: [
        {
            words: ['pat', 'mad'],
            date: twoWeeks()
        },
        {
            words: [],
            date: twoWeeks()
        },
        {
            words: ['pat'],
            date: twoWeeks()
        },
        {
            words: ['pat'],
            date: threeDays()
        }
    ]
}
const PROGRESS_BOOK_3 = {
    collectionId: '002',
    bookId: 3,
    history: [
        {
            words: ['pick', 'pan'],
            date: twoMonths()
        },
        {
            words: [],
            date: twoDays()
        }
    ]
}
const PROGRESS_BOOK_4 = {
    collectionId: '003',
    bookId: 1,
    history: [
        {
            words: ['hungry', 'and', 'came', 'want', 'silly'],
            date: threeDays()
        }
    ]
}
const PROGRESS_BOOK_5 = {
    collectionId: '002',
    bookId: 4,
    history: [
        {
            words: ['rick', 'sick'],
            date: twoDays()
        }
    ]
}


export const NoStudentsMock = []
export const StudentWithNoProgress = [STUDENT_1]

export const studentsMockData = [
    {
        studentId: 1,
        firstname: 'John',
        lastname: 'Bob',
        dob: '2011-06-11',
        progress: [
            {
                collectionId: '002',
                bookId: 1,
                history: [
                    {
                        words: [],
                        date: twoMonths()
                    },
                    {
                        words: ['mad'],
                        date: twoMonths()
                    },
                    {
                        words: ['dan', 'mad', 'it'],
                        date: twoMonths()
                    },
                    {
                        words: ['sid'],
                        date: twoWeeks()
                    },
                    {
                        words: [
                            'am',
                            'sid',
                            'am',
                            'dan',
                            'is',
                            'sad',
                            'is',
                            'mad',
                            'it',
                            'sid',
                            'is',
                            'pip',
                            'did'
                        ],
                        date: threeDays()
                    }
                ]
            },
            {
                collectionId: '002',
                bookId: 2,
                history: [
                    {
                        words: ['pat', 'mad'],
                        date: twoWeeks()
                    },
                    {
                        words: [],
                        date: twoWeeks()
                    },
                    {
                        words: ['pat'],
                        date: twoWeeks()
                    },
                    {
                        words: ['pat'],
                        date: threeDays()
                    }
                ]
            },
            {
                collectionId: '002',
                bookId: 3,
                history: [
                    {
                        words: ['pick', 'pan'],
                        date: twoMonths()
                    },
                    {
                        words: [],
                        date: twoDays()
                    }
                ]
            },
            {
                collectionId: '003',
                bookId: 1,
                history: [
                    {
                        words: ['hungry', 'and', 'came', 'want', 'silly'],
                        date: threeDays()
                    }
                ]
            },
            {
                collectionId: '002',
                bookId: 4,
                history: [
                    {
                        words: ['rick', 'sick'],
                        date: twoDays()
                    }
                ]
            }
        ]
    },
    {
        studentId: 2,
        firstname: 'Bob',
        lastname: 'Billy',
        dob: '2016-08-03',
        progress: null
    }
]
