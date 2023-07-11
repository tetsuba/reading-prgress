type PropTypes = {
    array: any[] | undefined
    children: JSX.Element
    [key: string]: any
}
export default function Loop(props: PropTypes) {
    const { children, array, ...rest } = props
    return (
        <>
            {props.array &&
                props.array.map(function <T>(data: T, index: number) {
                    return (
                        <props.children.type
                            key={`${Date.now()}-${index}`}
                            {...props.children.props}
                            data={data}
                            index={index}
                            {...rest}
                        />
                    )
                })}
        </>
    )
}
