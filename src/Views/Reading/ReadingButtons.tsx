import Svg from '../../Components/Svg/Svg'
import Button from '../../Components/Button/Button'

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
            className="absolute right-2 bottom-1 hover:text-green-500"
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
