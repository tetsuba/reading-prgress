type PropTypes = {
    top: number
}
export default function ScrollTo(props: PropTypes) {
    window.scrollTo(0, props.top)
    return null
}
