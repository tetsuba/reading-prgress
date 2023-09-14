import getFormClasses, { FormClassesTypes } from './formClasses.tailwind'

type PropTypes = {
    name?: string
    placeholder?: string
    id?: string
    rows?: number
    className?: number
}

export default function Textarea(props: PropTypes) {
    const className = `${getFormClasses('textarea')} ${props.className || ''}`
    return <textarea {...props} className={className} />
}
