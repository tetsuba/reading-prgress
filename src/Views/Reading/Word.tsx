import Button from '../../Components/Button/Button'

type PropTypes = {
    children: string
    status: string
    clickHandler: () => void
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
            type="button"
            template="none"
            className={`mr-5 inline-block cursor-pointer border-b-2 transition-all duration-300 ${border}`}
            key={`button--${props.index}`}
            clickHandler={props.clickHandler}
        >
            {props.children}
        </Button>
    )
}
