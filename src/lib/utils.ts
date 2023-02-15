// TODO: fix target types
export function formDataToQueryString(target: any): string {
    const formData: { [k: string]: string } = {
        firstName: target.firstName.value,
        lastName: target.lastName.value,
        email: target.email.value,
        password: target.password.value
    }

    return Object.keys(formData)
        .map((key) => key + '=' + formData[key])
        .join('&')
}

// TODO: fix target types
export function formDataToObject(target: any): { [p: string]: string } {
    return {
        username: target.email.value,
        password: target.password.value
    }
}

// TODO: fix error types
export function getErrorMessage(error: any): string {
    if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.error
    )
        return error.response.data.error
    // if (error && error.message) return error.message
    return ''
}

export function delay(time: number) {
    return new Promise((resolve) => setTimeout(() => resolve('success'), time))
}

// TODO: fix target types
export function mutateRegisterBookData(target: any, userId: string) {
    return {
        userId,
        title: target.title.value,
        story: target.story.value
    }
}

export function parseBookHistory(history: string | null) {
    return history ? JSON.parse(history) : []
}
