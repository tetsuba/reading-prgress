import { useDispatch } from 'react-redux'
import { resetUserToInitialState } from '../../store/user/userSlice'
import ls from '../../lib/localStorage'

// COMPONENTS
import Svg from '../Svg/Svg'
import H3 from '../H3/H3'
import P from '../P/P'
import Button from '../Button/Button'
import { toggleViewGlobalExpired } from '../../store/view/viewSlice'

export default function Expired() {
    const dispatch = useDispatch()
    return (
        <div
            data-testid="modal-expired"
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <Svg type="warning" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <H3>Session Expired</H3>
                        <div className="mt-2">
                            <P className="text-sm text-gray-500">
                                Your session has expired. Please log back in to
                                gain access to your account.
                            </P>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <Button
                    dataTestid="expired-button"
                    template="primary"
                    type="button"
                    className="mr-5"
                    clickHandler={() => {
                        ls.remove()
                        dispatch(resetUserToInitialState())
                        dispatch(toggleViewGlobalExpired(false))
                    }}
                >
                    Sign out
                </Button>
            </div>
        </div>
    )
}
