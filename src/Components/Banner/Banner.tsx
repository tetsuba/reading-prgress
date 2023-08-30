import Svg, { SvgIconTypes } from '../Svg/Svg'
import * as R from 'ramda'

export type LastBookReadTypes = {
    words: string[]
    date: string
    title: string
}

type PropTypes = {
    className: string
    data?: LastBookReadTypes
}

type ColorTypes = { [k: string]: string }
type IconTypes = { [k: string]: SvgIconTypes }

const getColor = R.compose(
    R.ifElse(R.isEmpty, R.always('green'), R.always('red')),
    R.pathOr(false, ['data', 'words'])
)

const getDate = R.pathOr('', ['data', 'date'])
const getTitle = R.pathOr('', ['data', 'title'])

export default function Banner(props: PropTypes) {
    const colorOption = getColor(props)

    const color: ColorTypes = {
        green: 'border-green-500 bg-green-50',
        red: 'border-red-500 bg-red-50'
    }
    const icon: IconTypes = {
        green: 'thumb',
        red: 'warning'
    }

    return (
        <div
            className={`flex justify-between border-y-2 p-4 md:rounded-xl md:border-x-2 ${props.className} ${color[colorOption]}`}
        >
            [{getDate(props)}] {getTitle(props)}{' '}
            <span>
                <Svg icon={icon[colorOption]} />
            </span>
        </div>
    )
}
