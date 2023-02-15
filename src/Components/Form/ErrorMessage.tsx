type PropTypes = {
    className: string
    children: string
    show: boolean
}

export default function ErrorMessage(props: PropTypes) {
    const classNames = props.className
    return props.show ? (
        <span
            data-testid="error-message"
            className={`font-bold text-red-600 ${classNames}`}
        >
            {props.children}
        </span>
    ) : null
}
