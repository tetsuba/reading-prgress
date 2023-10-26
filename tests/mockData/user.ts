import {NoStudentsMock, STUDENT_1} from './students'
import mockBooks from './books'
import books from "./books";

export const USER_1 = {
    id: 7,
    firstName: 'bob',
    lastName: 'bob',
    email: 'bob@bob.com',
    password: '123456'
}

const {id, ...registerUser} = USER_1
const {password, ...loginUser} = USER_1

export const USER_1_REGISTER = registerUser
export const USER_1_LOGIN = {
    token: 'mockTokenForTesting',
    user: loginUser,
    books: books,
    students: NoStudentsMock
}

export const USER_1_AUTHORISED = {
    token: 'mockTokenForTesting',
    user: loginUser,
    books: books,
    students: [STUDENT_1]
}

export const userMockData =  {
    token: 'mockTokenForTesting',
    user: {
        id: 7,
        firstName: 'bob',
        lastName: 'bob',
        email: 'bob@bob.com'
    }
}

export const userDetailsLogin = {
    token: 'mockTokenForTesting',
    user: {
        id: 7,
        firstName: 'bob',
        lastName: 'bob',
        email: 'bob@bob.com'
    }
}
export const userDetails = {
    user: {
        id: 7,
        firstName: 'bob',
        lastName: 'bob',
        email: 'bob@bob.com'
    },
    students: NoStudentsMock,
    books: mockBooks
}

export const userLoginError = {
    success: false,
    status: 500,
    message: 'Internal Server Error',
    stack: 'Incorrect username or password'
}
