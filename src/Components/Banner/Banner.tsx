import Svg from '../Svg/Svg'

export type LastBookReadTypes = {
    completed: boolean
    date: string
    title: string
    // bookId: number
    // collectionId: string
}

type PropTypes = {
    className: string
    data?: LastBookReadTypes
}

export default function Banner(props: PropTypes) {
    const { data = { completed: false, date: '', title: '' } } = props
    const { completed, date, title } = data

    const color = completed
        ? 'border-green-500 bg-green-50'
        : 'border-red-500 bg-red-50'

    return (
        <div
            data-testid="banner-test"
            className={`flex justify-between border-y-2 p-4 md:rounded-xl md:border-x-2 ${props.className} ${color}`}
        >
            {`[${date}] ${title}  `}
            <span>
                <Svg icon={completed ? 'thumb' : 'warning'} />
            </span>
        </div>
    )
}
