type PropTypes = {
    array: any[]
    children: JSX.Element
}
export default function Loop(props: PropTypes) {
    return (
        <>
            {props.array.map(function <T>(data: T, index: number) {
                return (
                    <props.children.type
                        key={`${Date.now()}-${index}`}
                        {...props.children.props}
                        data={data}
                        index={index}
                    />
                )
            })}
        </>
    )
}
