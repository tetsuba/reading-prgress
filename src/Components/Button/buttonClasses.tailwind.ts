const BUTTON_CLASSES = {
    FILLED: {
        DEFAULT:
            'flex items-center rounded-lg font-medium text-base text-center px-5 py-2.5',
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
        },
        get DISABLED() {
            return `${this.DEFAULT} text-gray-400 bg-gray-200`
        }
    },
    TEXT_LINK: 'text-blue-700 hover:underline dark:text-blue-500',
    ICON: {
        DEFAULT:
            'bg-transparent inline-flex items-center rounded-lg text-sm text-gray-400',
        get CLOSE() {
            return `${this.DEFAULT} p-1.5`
        },
        get USER() {
            return `${this.DEFAULT} rounded-full bg-gray-800`
        },
        get HISTORY() {
            return `${this.DEFAULT} p-2`
        },
        get BACK() {
            return `${this.DEFAULT} p-2`
        }
    },
    HOVER: {
        GREY: 'hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white'
        // GREY: 'hover:bg-gray-100 hover:text-gray-900 focus:outline-none hover:border-white '
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
    get disabled() {
        return `${this.FILLED.DISABLED}`
    },
    get svgClose() {
        return `${this.ICON.CLOSE} ${this.HOVER.GREY}`
    },
    get ['icon-close']() {
        return `${this.ICON.CLOSE} ${this.HOVER.GREY}`
    },
    get ['icon-history']() {
        return `${this.ICON.HISTORY} ${this.HOVER.GREY}`
    },
    get ['icon-back']() {
        return `${this.ICON.BACK} ${this.HOVER.GREY}`
    },
    get ['icon-user']() {
        return `${this.ICON.USER}`
    },
    get ['icon-check-badge']() {
        return `${this.ICON.DEFAULT} hover:text-green-500`
    },
    get ['icon-delete']() {
        return `${this.ICON.DEFAULT} ${this.HOVER.GREY}`
    },
    get icon() {
        return `${this.ICON.DEFAULT}`
    },
    get ['text-link']() {
        return this.TEXT_LINK
    },
    ['nav-menu-desktop']:
        'block w-full bg-white px-4 py-2 text-left text-sm text-gray-700 hover:border-white hover:bg-gray-200',
    readingWord:
        'mr-5 inline-block cursor-pointer border-b-2 transition-all duration-300 ',
    ['menu-button-mobile']:
        'w-full bg-blue-500 py-4 text-center text-2xl text-white',
    none: ''
}

export type TailwindTemplateTypes =
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'warning'
    | 'disabled'
    | 'text-link'
    | 'icon-close'
    | 'icon-history'
    | 'icon-back'
    | 'icon-user'
    | 'icon-check-badge'
    | 'icon-delete'
    | 'icon'
    | 'none'
    | 'nav-menu-desktop'
    | 'readingWord'
    | 'menu-button-mobile'
export default function getTailWindClasses(key: TailwindTemplateTypes): string {
    return BUTTON_CLASSES[key]
}
