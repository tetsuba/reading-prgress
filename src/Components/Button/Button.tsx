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
    template: 'submit' | 'buttonClose' | 'primary' | 'none' | 'delete'
}

const buttonClasses: { [k: string]: string } = {
    none: '',
    submit: 'w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
    buttonClose:
        'absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white',
    primary:
        'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
    delete: 'right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
}

export default function Button(props: PropTypes) {
    // const svgName: string = props.svg ? capitaliseFirstLetter(props.svg) : ''

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
