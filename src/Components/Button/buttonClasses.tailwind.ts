const BUTTON_CLASSES = {
    FILLED: {
        DEFAULT: 'rounded-lg font-medium text-base text-center px-5 py-2.5',
        get PRIMARY() {
            return `${this.DEFAULT} text-white bg-blue-700 hover:bg-blue-800`
        },
        get SECONDARY() {
            return `${this.DEFAULT} text-gray bg-gray-200 hover:bg-gray-300`
        },
        get TERTIARY() {
            return `${this.DEFAULT} text-white bg-green-500 hover:bg-green-600`
        },
        get WARNING() {
            return `${this.DEFAULT} text-white bg-red-700 hover:bg-red-800`
        }
    },
    TEXT_LINK: 'text-blue-700 hover:underline dark:text-blue-500',
    SVG: {
        DEFAULT:
            'bg-transparent inline-flex items-center rounded-lg text-sm text-gray-400',
        get CLOSE() {
            return `${this.DEFAULT} absolute right-2.5 top-3 ml-auto p-1.5`
        },
        get USER() {
            return `${this.DEFAULT} rounded-full bg-gray-800`
        }
    },
    HOVER: {
        GREY: 'hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white'
    },
    get primary(): string {
        return `${this.FILLED.PRIMARY}`
    },
    get secondary() {
        return `${this.FILLED.SECONDARY}`
    },
    get tertiary() {
        return `${this.FILLED.TERTIARY}`
    },
    get warning() {
        return `${this.FILLED.WARNING}`
    },
    get svgClose() {
        return `${this.SVG.CLOSE} ${this.HOVER.GREY}`
    },
    get svgUser() {
        return `${this.SVG.USER}`
    },
    get svgDelete() {
        return `${this.SVG.DEFAULT} ${this.HOVER.GREY}`
    },
    get svg() {
        return `${this.SVG.DEFAULT}`
    },
    get textLink() {
        return this.TEXT_LINK
    },
    desktopNavMenuSignOut:
        'block w-full bg-white px-4 py-2 text-left text-sm text-gray-700 hover:border-white hover:bg-gray-200',
    readingWord:
        'mr-5 inline-block cursor-pointer border-b-2 transition-all duration-300 ',
    mobileMenuButton: 'w-full bg-blue-500 py-4 text-center text-2xl text-white',
    none: ''
}

export type TailwindTemplateTypes =
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'warning'
    | 'svgClose'
    | 'textLink'
    | 'svgUser'
    | 'svgDelete'
    | 'svg'
    | 'none'
    | 'desktopNavMenuSignOut'
    | 'readingWord'
    | 'mobileMenuButton'
export default function getTailWindClasses(key: TailwindTemplateTypes): string {
    return BUTTON_CLASSES[key]
}
