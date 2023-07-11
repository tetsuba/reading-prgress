import getFormClasses, { FormClassesTypes } from './formClasses.tailwind'

type PropTypes = {
    className?: string
    id?: string
    name?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    readonly?: boolean
    template: FormClassesTypes
    type: 'email' | 'password' | 'checkbox' | 'text'
    value?: string
}

export default function Input(props: PropTypes) {
    const className = `${getFormClasses(props.template)} ${
        props.className || ''
    }`
    return <input {...props} className={className} />
}
