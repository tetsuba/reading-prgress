import * as R from 'ramda'
import getTailWindClasses, {
    TailwindTemplateTypes
} from './buttonClasses.tailwind'
import Svg, { SvgIconTypes } from '../Svg/Svg'

type ChildrenTypes = string | JSX.Element

type PropTypes = {
    children?: ChildrenTypes | ChildrenTypes[]
    className?: string
    onClick?: () => void
    template: TailwindTemplateTypes
    type?: 'button' | 'submit' | 'reset'
    icon?: SvgIconTypes
    right?: boolean
}

//** This is a test  */
export default function Button(props: PropTypes): JSX.Element {
    const { right, icon, children, template, className, ...rest } = props

    const iconOnly = !!icon && !children
    const textOnly = !!children && !icon
    const textAndIcon = !!children && !!icon

    const tailwindClasses = `${getTailWindClasses(template)} ${className || ''}`

    return (
        <button {...rest} className={tailwindClasses}>
            {iconOnly && <Svg icon={icon} />}
            {textOnly && children}
            {textAndIcon &&
                (right ? (
                    <>
                        {children}
                        <Svg icon={icon} />{' '}
                    </>
                ) : (
                    <>
                        <Svg icon={icon} />
                        {children}
                    </>
                ))}
        </button>
    )
}
