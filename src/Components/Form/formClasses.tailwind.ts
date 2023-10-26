const TAILWIND_CLASSES = {
    SHARED: {
        BORDER: 'border border-gray-300',
        BG: 'bg-gray-50',
        FOCUS: 'focus:ring-blue-500 focus:border-blue-500'
    },
    INPUT: {
        TEXT: ` text-gray-900 text-sm rounded-lg block w-full p-2.5`,
        CHECKBOX: `w-4 h-4 rounded focus:ring-3 focus:ring-blue-300`
    },
    TEXTAREA: `mt-1 block w-full rounded-md shadow-sm sm:text-sm`,

    get text() {
        return `${this.SHARED.BG} ${this.SHARED.BORDER} ${this.INPUT.TEXT} ${this.SHARED.FOCUS}`
    },
    get checkbox() {
        return `${this.SHARED.BG} ${this.SHARED.BORDER} ${this.INPUT.CHECKBOX}`
    }
}

export type FormClassesTypes = 'text' | 'checkbox'
export default function getFormClasses(key: FormClassesTypes): string {
    return TAILWIND_CLASSES[key]
}
