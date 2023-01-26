type PropTypes = {
    children: string
    className?: string
}
export default function P(props: PropTypes) {
    const classNames = props.className || ''
    return (
        <h1 className={`mt-6 text-lg leading-8 text-gray-600 sm:text-center ${classNames}`}>
            { props.children }
        </h1>
    )
}
