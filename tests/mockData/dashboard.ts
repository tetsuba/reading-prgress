export const dashboardEmptyData = {
    readIncorrectly: {
        oneWeekAgo: [],
        oneMonthAgo: [],
        history: []
    },
    lastBookRead: []
}
export const dashboardLastRead = {
    readIncorrectly: {
        oneWeekAgo: [],
        oneMonthAgo: [],
        history: []
    },
    lastBookRead: [
        {
            date: new Date().toLocaleDateString('en-UK'),
            bookId: 1,
            libId: '002',
            words: [],
            title: 'Double Trouble'
        }
    ]
}

export const dashboardLastReadWithErrors = {
    readIncorrectly: {
        oneWeekAgo: [],
        oneMonthAgo: [],
        history: []
    },
    lastBookRead: [
        {
            date: new Date().toLocaleDateString('en-UK'),
            bookId: 1,
            libId: '002',
            words: ['mad', 'am', 'bad'],
            title: 'Double Trouble'
        }
    ]
}

// {
//     "readIncorrectly": {
//     "oneWeekAgo": [],
//         "oneMonthAgo": [
//         {
//             "word": "dan",
//             "index": 4
//         },
//         {
//             "word": "sid",
//             "index": 2
//         },
//         {
//             "word": "pip",
//             "index": 1
//         },
//         {
//             "word": "tap",
//             "index": 1
//         },
//         {
//             "word": "map",
//             "index": 1
//         },
//         {
//             "word": "pit",
//             "index": 1
//         },
//         {
//             "word": "sit",
//             "index": 1
//         },
//         {
//             "word": "pat",
//             "index": 2
//         },
//         {
//             "word": "mad",
//             "index": 1
//         },
//         {
//             "word": "net",
//             "index": 1
//         },
//         {
//             "word": "fish",
//             "index": 1
//         },
//         {
//             "word": "looking",
//             "index": 1
//         },
//         {
//             "word": "clever",
//             "index": 1
//         },
//         {
//             "word": "bigger",
//             "index": 1
//         },
//         {
//             "word": "mouth",
//             "index": 1
//         },
//         {
//             "word": "water",
//             "index": 1
//         },
//         {
//             "word": "dog's",
//             "index": 1
//         }
//     ],
//         "history": [
//         {
//             "word": "sid",
//             "index": 1
//         },
//         {
//             "word": "am",
//             "index": 3
//         },
//         {
//             "word": "sad",
//             "index": 2
//         },
//         {
//             "word": "mad",
//             "index": 2
//         },
//         {
//             "word": "pit",
//             "index": 2
//         },
//         {
//             "word": "pick",
//             "index": 5
//         },
//         {
//             "word": "and",
//             "index": 4
//         },
//         {
//             "word": "nell",
//             "index": 2
//         },
//         {
//             "word": "pup",
//             "index": 2
//         },
//         {
//             "word": "ted",
//             "index": 2
//         },
//         {
//             "word": "tell",
//             "index": 2
//         },
//         {
//             "word": "bug",
//             "index": 2
//         },
//         {
//             "word": "got",
//             "index": 2
//         },
//         {
//             "word": "rock",
//             "index": 3
//         },
//         {
//             "word": "kick",
//             "index": 1
//         },
//         {
//             "word": "can",
//             "index": 21
//         },
//         {
//             "word": "get",
//             "index": 1
//         },
//         {
//             "word": "deck",
//             "index": 2
//         },
//         {
//             "word": "at",
//             "index": 1
//         },
//         {
//             "word": "ten",
//             "index": 1
//         },
//         {
//             "word": "men",
//             "index": 1
//         },
//         {
//             "word": "run",
//             "index": 1
//         },
//         {
//             "word": "pack",
//             "index": 1
//         },
//         {
//             "word": "did",
//             "index": 1
//         },
//         {
//             "word": "net",
//             "index": 2
//         },
//         {
//             "word": "duck",
//             "index": 1
//         },
//         {
//             "word": "off",
//             "index": 1
//         },
//         {
//             "word": "quick",
//             "index": 3
//         },
//         {
//             "word": "quack",
//             "index": 1
//         },
//         {
//             "word": "well",
//             "index": 1
//         }
//     ]
// },
//     "lastBookRead": [
//     {
//         "date": "25/08/2023",
//         "bookId": 67,
//         "libId": "001",
//         "words": []
//     },
//     {
//         "date": "25/08/2023",
//         "bookId": 69,
//         "libId": "001",
//         "words": [],
//         "book": "ww"
//     }
// ]
// }
