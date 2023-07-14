import Svg from '../Svg/Svg'
import Button from './Button'

type PropTypes = {
    onClick?: () => void
}

export function BackToBooksButton(props: PropTypes) {
    return (
        <Button
            className="ml-4 flex items-center place-self-start"
            data-testid="back-button"
            template="secondary"
            {...props}
        >
            <Svg icon="back" />
            <span className="ml-2 hidden md:inline">Back to books</span>
        </Button>
    )
}

export function BackToCollectionButton(props: PropTypes) {
    return (
        <Button
            className="mb-6 flex"
            data-testid="back-button"
            template="primary"
            {...props}
        >
            <Svg icon="back" />
            <span className="ml-2">Back</span>
        </Button>
    )
}

export function HistoryButton(props: PropTypes) {
    return (
        <Button
            data-testid="history-button"
            template="svg"
            className={`mb-3 p-2 hover:border-white hover:bg-gray-100 hover:text-gray-900 focus:outline-none`}
            {...props}
        >
            <Svg icon="history" />
        </Button>
    )
}
export function HistoryBackButton(props: PropTypes) {
    return (
        <Button
            data-testid="history-back-button"
            template="svg"
            className={`p-2 text-blue-500 hover:bg-gray-100`}
            {...props}
        >
            <Svg icon="back" />
        </Button>
    )
}

export function SentenceCompleteButton(props: PropTypes) {
    return (
        <Button
            data-testid="sentence-complete"
            template="svg"
            className="absolute bottom-1 right-2 hover:text-green-500"
            {...props}
        >
            <Svg icon="check-badge" />
        </Button>
    )
}

export function SentenceBackButton(props: PropTypes) {
    return (
        <Button
            data-testid="sentence-back-button"
            template="svg"
            className={`mb-3 p-2 hover:bg-gray-100`}
            {...props}
        >
            <Svg icon="back" />
        </Button>
    )
}

export function ViewBooksButton(props: PropTypes & { inactive: boolean }) {
    const { inactive, ...rest } = props
    return (
        <Button
            className="flex items-center"
            data-testid="collection-button"
            template={`${props.inactive ? 'disabled' : 'secondary'}`}
            {...rest}
        >
            <span className="hidden md:inline">View Books</span>
            <Svg icon="eye" className="md:ml-2" />
        </Button>
    )
}

export function DeleteBookButton(props: PropTypes) {
    return (
        <Button
            data-testid="book-list-delete"
            template="svgDelete"
            className="ml-2"
            {...props}
        >
            <Svg icon="delete" />
        </Button>
    )
}

export function ReadBookButton(props: PropTypes) {
    return (
        <Button data-testid="book-list-read" template="secondary" {...props}>
            Read
        </Button>
    )
}

export function TextLinkButton(props: PropTypes & { children: string }) {
    return <Button template="textLink" className="ml-1" {...props} />
}

export function CloseButton(props: PropTypes & { className: string }) {
    return (
        <Button template="svgClose" data-testid="modal-close" {...props}>
            <Svg icon="close" />
        </Button>
    )
}

export function NavSignOutButton(props: PropTypes) {
    return (
        <Button type="button" template="desktopNavMenuSignOut" {...props}>
            Sign out
        </Button>
    )
}

export function MenuButton(props: PropTypes) {
    return (
        <Button
            data-testid="mobile-menu-button"
            template="svg"
            className=""
            {...props}
        >
            <Svg icon="menu" />
        </Button>
    )
}
