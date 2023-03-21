type PropTypes = {
    children: string
    className?: string
}
export default function H3(props: PropTypes) {
    return (
        <h3
            className={`text-ml md:text-xl font-medium text-gray-900 dark:text-white ${
                props.className || ''
            }`}
        >
            {props.children}
        </h3>
    )
}
