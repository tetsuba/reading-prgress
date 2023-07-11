import Svg, { SvgIconTypes } from '../Svg/Svg'

type LastBookReadTypes = {
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
export default function Banner(props: PropTypes) {
    const colorOption = props.data?.words.length ? 'red' : 'green'

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
            [{props.data?.date}] {props.data?.title}{' '}
            <span>
                <Svg icon={icon[colorOption]} />
            </span>
        </div>
    )
}
