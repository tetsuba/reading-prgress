import data from '../api/walter.json'
import Speech from '../Components/Speech/Speech'
import Header from '../Components/Header/Header'
import { useSelector } from 'react-redux'
import { bookSelector } from '../store/book/bookSelectors'

export default function Reading() {
    const book = useSelector(bookSelector)
    return (
        <>
            <Header text={`Reading: ${book.title}`} />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <Speech story={book.story} />
                    </div>
                </div>
            </main>
        </>
    )
}
