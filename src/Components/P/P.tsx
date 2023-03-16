type PropTypes = {
    children: string
    className: string
}
export default function P(props: PropTypes) {
    return <p className={`${props.className}`}>{props.children}</p>
}
