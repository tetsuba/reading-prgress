import Svg from '../Svg/Svg'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
    updateCurrentBookId,
    updateCurrentCollectionId
} from '../../store/current/currentSlice'

export type LastBookReadTypes = {
    completed: boolean
    date: string
    title: string
    bookId: number
    collectionId: string
}

type PropTypes = {
    className: string
    data?: LastBookReadTypes
}

export default function Banner(props: PropTypes) {
    const dispatch = useDispatch()
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
            <span>
                <Link
                    data-testid="banner-title"
                    className="hover:underline"
                    onClick={() => {
                        dispatch(
                            updateCurrentCollectionId(props.data!.collectionId)
                        )
                        dispatch(updateCurrentBookId(props.data!.bookId))
                    }}
                    to="/reading"
                >{`[${date}] ${title} `}</Link>
            </span>
            <span>
                <Svg icon={completed ? 'thumb' : 'warning'} />
            </span>
        </div>
    )
}
