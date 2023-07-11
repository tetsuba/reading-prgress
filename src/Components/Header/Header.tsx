type PropTypes = {
    text: string
    children?: JSX.Element
}

export default function Header(props: PropTypes) {
    return (
        <header className="bg-white shadow">
            <div className="mx-auto flex max-w-7xl justify-between px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    {props.text}
                </h1>
                {props.children}
            </div>
        </header>
    )
}
