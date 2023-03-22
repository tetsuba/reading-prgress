type PropTypes = {
    children: string
    className?: string
}
export default function H3(props: PropTypes) {
    return (
        <h3
            className={`text-ml font-medium text-gray-900 dark:text-white md:text-xl ${
                props.className || ''
            }`}
        >
            {props.children}
        </h3>
    )
}
