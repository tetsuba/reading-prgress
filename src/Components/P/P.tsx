type PropTypes = {
    children: string
    className?: string
}
export default function P(props: PropTypes) {
    const classNames = props.className || ''
    return <p className={`${classNames}`}>{props.children}</p>
}
