import {getBookStatusColour} from "../book-utils";

describe('book-utils', () => {
    describe('getBookStatusColour()', () => {
        test('should return gray', () => {
            expect(getBookStatusColour(null)).toEqual('text-gray-300')
        })
        test('should return green', () => {
            const history = [{date: '12/12/2222', words: []}]
            expect(getBookStatusColour(history)).toEqual('text-green-500')
        })
        test('should return red', () => {
            const history = [{date: '12/12/2222', words: ['there']}]
            expect(getBookStatusColour(history)).toEqual('text-red-500')
        })
    })
})