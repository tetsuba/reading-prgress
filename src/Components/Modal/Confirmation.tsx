import Svg from '../Svg/Svg'
import H3 from '../H3/H3'
import P from '../P/P'
import Button from '../Button/Button'

type PropTypes = {
    bookTile: string
    clickHandlerCancel: () => void
    clickHandlerDelete: () => void
}
export default function Confirmation(props: PropTypes) {
    return (
        <div
            data-testid="modal-confirmation"
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <Svg type="warning" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <H3>{`${props.bookTile}`}</H3>
                        <div className="mt-2">
                            <P className="text-sm text-gray-500">
                                Are you sure you want to delete this book? All
                                of your data will be permanently removed. This
                                action cannot be undone.
                            </P>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <Button
                    dataTestid="delete-button"
                    template="warning"
                    type="button"
                    clickHandler={() => props.clickHandlerDelete()}
                >
                    Delete
                </Button>
                <Button
                    dataTestid="cancel-button"
                    template="secondary"
                    type="button"
                    className="mr-5"
                    clickHandler={() => props.clickHandlerCancel()}
                >
                    Cancel
                </Button>
            </div>
        </div>
    )
}
