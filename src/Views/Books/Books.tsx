import { useState } from 'react'
import Header from '../../Components/Header/Header'
import BookList from './BookList'
import RegisterBookForm from './RegisterBookForm'
import Button from '../../Components/Button/Button'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { userIdSelector } from '../../store/user/userSelectors'
import { getBooks } from '../../lib/service'

export default function Books() {
    const userId = useSelector(userIdSelector)
    const { data, isSuccess } = useQuery(['books', userId], getBooks)
    const [display, setDisplay] = useState('list') // list | add | edit | view
    return (
        <div>
            <Header text="Books" />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="flex justify-end">
                        {display === 'list' && (
                            <Button
                                type="button"
                                template="primary"
                                clickHandler={() => setDisplay('add')}
                            >
                                Add New Book
                            </Button>
                        )}
                    </div>
                    <div className="px-4 py-6 sm:px-0">
                        {display === 'list' && isSuccess && (
                            // Delete book
                            <BookList list={data.data} />
                        )}
                        {display === 'add' && (
                            <RegisterBookForm
                                clickHandlerCancel={() => setDisplay('list')}
                            />
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
