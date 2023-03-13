import Button from '../Components/Button/Button'
import { useNavigate } from 'react-router-dom'

export default function PageNotFound() {
    const navigate = useNavigate()
    return (
        <main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-indigo-600">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Page not found
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                    Sorry, we couldn’t find the page you’re looking for.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Button
                        dataTestid="go-back-button"
                        type="button"
                        template="primary"
                        clickHandler={() => navigate(-1)}
                    >
                        Go back
                    </Button>
                </div>
            </div>
        </main>
    )
}
