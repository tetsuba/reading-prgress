type PropTypes = {
    children: JSX.Element | JSX.Element[]
    value: boolean
}

export default function Display(props: PropTypes) {
    return props.value ? <>{props.children}</> : <></>
}
