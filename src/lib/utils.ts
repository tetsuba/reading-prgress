type ValueType = {
    value: string
}

interface RegistrationFormTypes extends EventTarget {
    firstName?: ValueType
    lastName?: ValueType
    email?: ValueType
    password?: ValueType
}

export function formDataToQueryString(target: RegistrationFormTypes): string {
    const formData: { [key: string]: string | undefined } = {
        firstName: target.firstName?.value,
        lastName: target.lastName?.value,
        email: target.email?.value,
        password: target.password?.value
    }

    return Object.keys(formData)
        .map((key) => key + '=' + formData[key])
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
    userId: string
): { [key: string]: string | undefined } {
    return {
        userId,
        title: target.title?.value,
        story: target.story?.value
    }
}
