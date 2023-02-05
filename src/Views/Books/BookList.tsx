import { useMutation, useQueryClient } from 'react-query'
import Button from '../../Components/Button/Button'
import { deleteBook } from '../../lib/service'
import { useDispatch, useSelector } from 'react-redux'
import { userIdSelector } from '../../store/user/userSelectors'
import { addBook } from '../../store/book/bookSlice'
import {useNavigate} from "react-router-dom";

export default function BookList(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userId = useSelector(userIdSelector)
    const queryClient = useQueryClient()
    const mutation = useMutation(deleteBook, {
        onSuccess: async (data) => {
            queryClient.setQueryData(['books', userId], data)
        }
    })

    return (
        <div>
            <div className="rounded-t-lg bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="text-lg font-bold text-gray-900">
                    Book Title
                </div>
            </div>
            {props.list.map((story, i) => (
                <div
                    key={`book-list-${i}`}
                    className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${
                        i & 1 ? 'bg-white' : 'bg-gray-50'
                    }`}
                >
                    <div className="text-base font-medium text-gray-800 items-center flex">
                        {story.title}
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0">

                    </div>
                    <div className="mt-1 flex justify-end text-sm text-gray-900 sm:mt-0">
                        <Button
                            template="secondary"
                            clickHandler={() => {
                                dispatch(addBook(story))
                                navigate('/reading')
                            }}
                        >
                            Read
                        </Button>
                        <Button
                            template="icon"
                            svg="delete"
                            className="ml-2"
                            clickHandler={() => {
                                mutation.mutate(`?bookId=${story.id}`)
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}
