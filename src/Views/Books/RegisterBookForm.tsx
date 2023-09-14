import { useSelector } from 'react-redux'
import { useMutation, useQueryClient } from 'react-query'
import { userIdSelector } from '../../store/user/userSelectors'
import { mutateRegisterBookData } from '../../lib/utils'

// COMPONENTS
import Input from '../../Components/Form/Input'
import Label from '../../Components/Form/Label'
import Textarea from '../../Components/Form/Textarea'
import Button from '../../Components/Button/Button'
import H3 from '../../Components/H3/H3'
import { registerBook } from '../../api/book'

type PropTypes = {
    clickHandlerCancel: () => void
}

export default function RegisterBookForm(props: PropTypes) {
    const userId = useSelector(userIdSelector)
    const queryClient = useQueryClient()
    const mutation = useMutation(registerBook, {
        onSuccess: (data) => {
            queryClient.setQueryData(['books', userId], data)
        },
        onSettled: () => {
            props.clickHandlerCancel()
        }
    })
    return (
        <div className="p-4 md:p-8">
            <H3 className="w-800 mb-3">Add new book</H3>
            <form
                data-testid="register-book-form"
                className="space-y-6"
                onSubmit={(event) => {
                    event.preventDefault()
                    const data = mutateRegisterBookData(event.target, userId)
                    mutation.mutate(data)
                }}
            >
                <div>
                    <Label htmlFor="title">Book Title</Label>
                    <Input template="text" name="title" type="text" />
                </div>
                <div>
                    <Label htmlFor="story">Story</Label>
                    <Textarea
                        id="about"
                        name="story"
                        rows={8}
                        placeholder="Story Here."
                    />
                </div>
                <div className="flex justify-end py-3">
                    <Button
                        type="button"
                        template="secondary"
                        onClick={props.clickHandlerCancel}
                    >
                        Cancel
                    </Button>
                    <Button className="ml-5" template="primary" type="submit">
                        Save
                    </Button>
                </div>
            </form>
        </div>
    )
}
