import Svg from '../Svg/Svg'
import { capitaliseFirstLetter } from '../../lib/utils'

type ChildrenTypes = string | JSX.Element

type PropTypes = {
    children?: ChildrenTypes | ChildrenTypes[]
    clickHandler?: () => void
    id?: string
    type?: 'button' | 'submit' | 'reset'
    svg?: 'close' | 'delete'
    className?: string
    dataTestid?: string
    template: 'icon' | 'primary' | 'none' | 'secondary' | 'warning'
}


const defaultStyles = 'rounded-lg font-medium text-base text-center px-5 py-2.5'

const buttonClasses: { [k: string]: string } = {
    none: '',
    primary: `${defaultStyles} text-white bg-blue-700 hover:bg-blue-800`,
    secondary: `${defaultStyles} text-gray bg-gray-200 hover:bg-gray-300`,
    warning: `${defaultStyles} text-white bg-red-700 hover:bg-red-800`,
    icon: 'bg-transparent inline-flex items-center rounded-lg text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white'
}

export default function Button(props: PropTypes) {
    const buttonClassNames = buttonClasses[props.template]
        ? buttonClasses[props.template]
        : ''

    const classNames = props.className ? props.className : ''

    return (
        <button
            data-testid={props.dataTestid}
            onClick={props.clickHandler}
            className={`${buttonClassNames} ${classNames}`}
            id={props.id}
            type={props.type}
        >
            {props.svg ? <Svg type={props.svg} /> : props.children}
        </button>
    )
}
