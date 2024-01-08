import { ApiTypes } from '../api/api-types'

type LibTypes = {
    value: string
}

type TargetValueTypes = Record<
    keyof Pick<ApiTypes, 'firstName' | 'lastName' | 'email' | 'password'>,
    Pick<LibTypes, 'value'>
>

export type RegistrationFormTypes = EventTarget & TargetValueTypes

export type LoginFormTypes = EventTarget &
    Pick<TargetValueTypes, 'email' | 'password'>
