import Button from '../../Components/Button/Button'

type PropTypes = {
    children: string
    status: string
    onClick: () => void
    index: number
}
export default function Word(props: PropTypes) {
    let border = ''
    switch (props.status) {
        case 'green':
            border = 'border-green-500'
            break
        case 'red':
            border = 'text-red-500 border-white'
            break
        default:
            border = 'border-gray-100'
    }
    return (
        <Button
            template="readingWord"
            className={`${border}`}
            key={`button--${props.index}`}
            onClick={props.onClick}
        >
            {props.children}
        </Button>
    )
}
