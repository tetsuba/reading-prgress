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
        firstName: target.firstName ? target.firstName.value : '',
        lastName: target.lastName ? target.lastName.value : '',
        email: target.email ? target.email.value : '',
        password: target.password ? target.password.value : ''
    }

    return Object.keys(formData)
        .map((key) => `${key}=${formData[key]}`)
        .join('&')
}

interface LoginFormTypes extends EventTarget {
    email?: ValueType
    password?: ValueType
}
export function formDataToObject(target: LoginFormTypes) {
    return {
        username: target.email?.value,
        password: target.password?.value
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
    if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.error
    ) {
        return error.response.data.error
    }
    return ''
}

export function delay(time: number) {
    return new Promise((resolve) => setTimeout(() => resolve('success'), time))
}

interface StoryFormTypes extends EventTarget {
    title?: ValueType
    story?: ValueType
}
export function mutateRegisterBookData(
    target: StoryFormTypes,
    userId: number
): { [key: string]: number | string | undefined } {
    return {
        userId,
        title: target.title?.value,
        story: target.story?.value
    }
}
