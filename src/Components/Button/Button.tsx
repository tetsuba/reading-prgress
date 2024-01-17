import { forwardRef, Ref } from 'react'
import getTailWindClasses, {
    TailwindTemplateTypes
} from './buttonClasses.tailwind'
import Svg, { SvgIconTypes } from '../Svg/Svg'

type ChildrenTypes = string | JSX.Element

type PropTypes = {
    template: TailwindTemplateTypes
    children?: ChildrenTypes | ChildrenTypes[]
    className?: string
    icon?: SvgIconTypes
    onBlur?: () => void
    onClick?: () => void
    right?: boolean
    tabIndex?: number
    type?: 'button' | 'submit' | 'reset'
}

//** This is a test  */
export default forwardRef(function Button(
    props: PropTypes,
    ref: Ref<HTMLButtonElement>
): JSX.Element {
    const { right, icon, children, template, className, ...rest } = props

    const iconOnly = !!icon && !children
    const textOnly = !!children && !icon
    const textAndIcon = !!children && !!icon

    const tailwindClasses = `${getTailWindClasses(template)} ${className || ''}`

    return (
        <button {...rest} ref={ref} className={tailwindClasses}>
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
})
