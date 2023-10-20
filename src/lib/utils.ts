import { LoginUserTypes, RegisterBookTypes } from '../api/api-types'
import * as R from 'ramda'

type ValueType = {
    value: string
}

export interface RegistrationFormTypes extends EventTarget {
    firstName?: ValueType
    lastName?: ValueType
    email?: ValueType
    password?: ValueType
}

export function formDataToQueryString(target: RegistrationFormTypes): string {
    const formData: { [key: string]: string } = {
        firstName: R.pathOr('', ['firstName', 'value'], target),
        lastName: R.pathOr('', ['lastName', 'value'], target),
        email: R.pathOr('', ['email', 'value'], target),
        password: R.pathOr('', ['password', 'value'], target)
    }

    return Object.keys(formData)
        .map((key) => `${key}=${formData[key]}`)
        .join('&')
}

interface LoginFormTypes extends EventTarget {
    email?: ValueType
    password?: ValueType
}
export function formDataToObject(target: LoginFormTypes): LoginUserTypes {
    return {
        username: R.pathOr('', ['email', 'value'], target),
        password: R.pathOr('', ['password', 'value'], target)
    }
}

interface LoginErrorMessageTypes extends Error {
    response?: {
        data: {
            error: string
        }
    }
}

export function getErrorMessage(error: LoginErrorMessageTypes): string {
    return R.pathOr('', ['response', 'data', 'stack'], error)
}

export function delay(time: number) {
    return new Promise((resolve) => setTimeout(() => resolve('success'), time))
}

interface StoryFormTypes extends EventTarget {
    title?: ValueType
    story?: ValueType
}

const constructStory = R.compose(
    R.filter((word) => R.not(R.isEmpty(word))),
    R.split(/\n/),
    R.pathOr('', ['story', 'value'])
)

export function isArray<T>(data: T): boolean {
    return Array.isArray(data)
}

export const notUndefined = <T>(v: T): boolean => R.not(R.isNil(v))
