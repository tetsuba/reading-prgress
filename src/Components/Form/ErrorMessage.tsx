type PropTypes = {
    className: string
    children: string
    show: boolean
}

export default function ErrorMessage (props: PropTypes) {
    const classNames = props.className
    return props.show
        ? (
            <span data-testid="error-message" className={`text-red-600 font-bold ${classNames}`}>
                {props.children}
            </span>
        )
        : null
}