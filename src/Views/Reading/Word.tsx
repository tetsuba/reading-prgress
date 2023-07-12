import Button from '../../Components/Button/Button'

type PropTypes = {
    data?: {
        word: string
        status: string
    }
    onClick: (status: string | undefined, wordIndex: number | undefined) => void
    index?: number
}
export default function Word(props: PropTypes) {
    let border = ''
    switch (props.data?.status) {
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
            onClick={() => props.onClick(props.data?.status, props.index)}
        >
            {props.data?.word}
        </Button>
    )
}
