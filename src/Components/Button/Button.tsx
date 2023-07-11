import getTailWindClasses, {
    TailwindTemplateTypes
} from './buttonClasses.tailwind'

type ChildrenTypes = string | JSX.Element

type PropTypes = {
    children?: ChildrenTypes | ChildrenTypes[]
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    className?: string
    template: TailwindTemplateTypes
}
export default function Button(props: PropTypes): JSX.Element {
    const className = `${getTailWindClasses(props.template)} ${
        props.className || ''
    }`
    return (
        <button {...props} className={className}>
            {props.children}
        </button>
    )
}
