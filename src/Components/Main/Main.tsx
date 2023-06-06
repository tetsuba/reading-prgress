type PropTypes = {
    children: JSX.Element | JSX.Element[]
}
export default function Main(props: PropTypes) {
    return (
        <main>
            <div className="mx-auto max-w-7xl py-6 md:px-6 lg:px-8">
                {props.children}
            </div>
        </main>
    )
}
