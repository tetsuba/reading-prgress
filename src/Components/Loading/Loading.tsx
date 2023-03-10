export default function Loading() {
    return (
        <div className="flex h-[80vh] flex-col items-center justify-center space-x-2">
            <div
                className="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-blue-300 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
            ></div>
            <span className="pt-2 text-sm text-blue-500 drop-shadow-xl">
                Loading...
            </span>
        </div>
    )
}
