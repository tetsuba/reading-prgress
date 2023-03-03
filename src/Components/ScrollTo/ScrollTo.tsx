type PropTypes = {
    top: number
}
export default function ScrollTo(props: PropTypes) {
    window.scrollTo({
        top: props.top,
        left: 0,
        behavior: 'smooth'
    })
    return null
}
