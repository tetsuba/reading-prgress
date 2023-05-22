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
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg"
        >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="">
                    <div className="mt-3 ml-4 flex items-center">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                            <Svg icon="warning" />
                        </div>
                        <H3 className="ml-4">{`${props.bookTile}`}</H3>
                    </div>
                    <div className="mt-3 ml-4">
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
            <div className="flex justify-end bg-gray-50 px-4 py-3">
                <Button
                    data-testid="cancel-button"
                    template="secondary"
                    className="mr-5"
                    onClick={() => props.clickHandlerCancel()}
                >
                    Cancel
                </Button>
                <Button
                    data-testid="delete-button"
                    template="warning"
                    onClick={() => props.clickHandlerDelete()}
                >
                    Delete
                </Button>
            </div>
        </div>
    )
}
