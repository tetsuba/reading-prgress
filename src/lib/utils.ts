import { LoginUserTypes } from '../api/api-types'
import * as R from 'ramda'
import { RegistrationFormTypes } from './lib.types'

export function formDataToQueryString(
    target: Partial<RegistrationFormTypes>
): string {
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

export function formDataToObject(target: EventTarget): LoginUserTypes {
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

export function isArray<T>(data: T): boolean {
    return Array.isArray(data)
}

export const notUndefined = <T>(v: T): boolean => R.not(R.isNil(v))
