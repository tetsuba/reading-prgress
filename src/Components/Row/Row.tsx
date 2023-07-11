import Svg, { SvgIconTypes } from '../Svg/Svg'

type PropTypes = {
    children: JSX.Element | JSX.Element[]
    index: number
    icon: SvgIconTypes
    iconColor: string
    text: string | undefined
}

export default function Row(props: PropTypes) {
    const rowShade = props.index & 1 ? 'bg-white' : 'bg-gray-50'
    return (
        <div
            key={`book-list-${props.index}`}
            className={`flex justify-between px-4 py-5 sm:gap-4 sm:px-6 ${rowShade}`}
        >
            <div className="flex items-center">
                <span className={`mr-6 ${props.iconColor}`}>
                    <Svg icon={props.icon} />
                </span>
                <span className="font-medium text-gray-800">{props.text}</span>
            </div>
            <div className="flex justify-end">{props.children}</div>
        </div>
    )
}
