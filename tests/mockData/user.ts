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
    }
}

export const userLoginError = {
    success: false,
    status: 500,
    message: 'Internal Server Error',
    stack: 'Incorrect username or password'
}
