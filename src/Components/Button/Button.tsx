import Svg, { SvgTypes } from '../Svg/Svg'

type ChildrenTypes = string | JSX.Element
export type ButtonTemplateTypes =
    | 'icon'
    | 'primary'
    | 'none'
    | 'secondary'
    | 'warning'
    | 'tertiary'

type PropTypes = {
    children?: ChildrenTypes | ChildrenTypes[]
    clickHandler?: () => void
    type: 'button' | 'submit' | 'reset'
    svg?: SvgTypes
    className?: string
    dataTestid?: string
    template: ButtonTemplateTypes
    title?: string
}

const defaultStyles = 'rounded-lg font-medium text-base text-center px-5 py-2.5'

export default function Button(props: PropTypes) {
    const classNames = props.className ? props.className : ''
    const buttonClasses: { [k: string]: string } = {
        none: '',
        primary: `${defaultStyles} text-white bg-blue-700 hover:bg-blue-800`,
        secondary: `${defaultStyles} text-gray bg-gray-200 hover:bg-gray-300`,
        tertiary: `${defaultStyles} text-white bg-green-500 hover:bg-green-600`,
        warning: `${defaultStyles} text-white bg-red-700 hover:bg-red-800`,
        icon: 'bg-transparent inline-flex items-center rounded-lg text-sm text-gray-400'
    }

    return (
        <button
            title={props.title}
            data-testid={props.dataTestid}
            onClick={props.clickHandler}
            className={`${buttonClasses[props.template]} ${classNames}`}
            type={props.type}
        >
            {props.svg ? <Svg type={props.svg} /> : props.children}
        </button>
    )
}
