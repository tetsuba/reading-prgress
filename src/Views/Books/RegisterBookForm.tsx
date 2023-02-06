import { useSelector } from 'react-redux'
import { useMutation, useQueryClient } from 'react-query'
import { registerBook } from '../../lib/service'
import { userIdSelector } from '../../store/user/userSelectors'
import { mutateRegisterBookData } from '../../lib/utils'

// COMPONENTS
import Input from '../../Components/Form/Input'
import Label from '../../Components/Form/Label'
import Textarea from '../../Components/Form/Textarea'
import Select from '../../Components/Form/Select'
import Button from '../../Components/Button/Button'
import H3 from '../../Components/H3/H3'

type PropTypes = {
    clickHandlerCancel: () => void
}

export default function RegisterBookForm(props: PropTypes) {
    const userId = useSelector(userIdSelector)
    const queryClient = useQueryClient()
    const mutation = useMutation(registerBook, {
        onSuccess: async (data) => {
            queryClient.setQueryData(['books', userId], data)
        },
        onSettled: async () => {
            props.clickHandlerCancel()
        }
    })
    return (
        <div className="mt-5 md:col-span-2 md:mt-0">
            <H3 className="mb-3">Add new book</H3>
            <form
                data-testid="register-book-form"
                className="space-y-6"
                onSubmit={(event) => {
                    event.preventDefault()
                    mutation.mutate(
                        mutateRegisterBookData(event.target, userId)
                    )
                }}
            >
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-3 sm:col-span-2">
                                <Label htmlFor="difficulty">Difficulty</Label>
                                <Select name="difficulty" />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-3 sm:col-span-2">
                                <Label htmlFor="title">Book Title</Label>
                                <Input name="title" type="text" />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="story">Story</Label>
                            <Textarea
                                id="about"
                                name="story"
                                rows={10}
                                placeholder="Story Here."
                            />
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <Button
                            template="secondary"
                            clickHandler={props.clickHandlerCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="ml-5"
                            template="primary"
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
