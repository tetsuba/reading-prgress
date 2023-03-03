export default function Footer() {
    return (
        <footer className="flex justify-center border-t-2 border-t-gray-50 py-12">
            <span className="text-sm text-gray-300">
                © {new Date().getFullYear()} Progress Tracker . All rights
                reserved.
            </span>
        </footer>
    )
}
