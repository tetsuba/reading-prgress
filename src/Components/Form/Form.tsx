import { SyntheticEvent } from 'react'

type FormTypes = {
    children: JSX.Element
    onSubmit: (e: SyntheticEvent) => void
}
export default function Form(props: FormTypes) {
    const { children, ...rest } = props
    return <form {...rest}>{children}</form>
}
