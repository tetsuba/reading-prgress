type PropTypes = {
    children: JSX.Element
}
export default function Main(props: PropTypes) {
    return (
        <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <div className="px-4 md:px-0">{props.children}</div>
            </div>
        </main>
    )
}
