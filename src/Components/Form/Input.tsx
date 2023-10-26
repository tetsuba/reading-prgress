import getFormClasses, { FormClassesTypes } from './formClasses.tailwind'

type PropTypes = {
    className?: string
    id?: string
    name?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    readonly?: boolean
    template: Exclude<FormClassesTypes, 'textarea'>
    type: 'email' | 'password' | 'checkbox' | 'text' | 'date'
    value?: string
}

export default function Input(props: PropTypes) {
    const { template, className, ...rest } = props
    const classname = `${getFormClasses(template)} ${className || ''}`
    return <input {...rest} className={classname} />
}
