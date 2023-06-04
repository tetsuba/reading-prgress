import Svg, { SvgIconTypes } from '../Svg/Svg'

type PropTypes = {
    children: any
    className: string
    color: string
}

type ColorTypes = { [k: string]: string }
type IconTypes = { [k: string]: SvgIconTypes }
export default function Banner(props: PropTypes) {
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
            className={`flex justify-between md:rounded-xl border-y-2 md:border-x-2 p-4 ${
                props.className
            } ${color[props.color]}`}
        >
            {props.children}{' '}
            <span>
                <Svg icon={icon[props.color]} />
            </span>
        </div>
    )
}
