type PropTypes = {
    type: 'close'
}

const svg = {
    close: {
        viewBox: '0 0 20 20',
        draw: 'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
    }
}

export default function Svg(props: PropTypes) {
    return (
        <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox={svg[props.type].viewBox}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                d={svg[props.type].draw}
                clipRule="evenodd">
            </path>
        </svg>
    )
}