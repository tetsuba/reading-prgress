type PropTypes = {
    children: JSX.Element | JSX.Element[]
}
export default function Main(props: PropTypes) {
    return (
        <main className="mx-auto max-w-7xl bg-white py-6 md:px-6 lg:px-8">
            {props.children}
        </main>
    )
}
