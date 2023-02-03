type PropTypes = {
    htmlFor: string
    children: string
    className?: string
}
export default function Label(props: PropTypes) {
    const classNames = props.className || ''
    return (
        <label
            htmlFor={props.htmlFor}
            className={`text-sm font-medium text-gray-900 dark:text-white ${classNames}`}
        >
            {props.children}
        </label>
    )
}
