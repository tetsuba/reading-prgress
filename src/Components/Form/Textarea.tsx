type PropTypes = {
    name?: string
    placeholder?: string
    id?: string
    rows?: number
}

export default function Textarea(props: PropTypes) {
    return (
        <textarea
            id={props.id}
            name={props.name}
            rows={props.rows}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder={props.placeholder}
        ></textarea>
    )
}
