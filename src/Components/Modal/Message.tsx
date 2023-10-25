import { useDispatch } from 'react-redux'
import ls from '../../lib/localStorage'

// STORE
import {
    toggleBooksShowMessage,
    toggleViewGlobalExpired
} from '../../store/view/viewSlice'
import { resetUserToInitialState } from '../../store/user/userSlice'
import { resetCurrentToInitialState } from '../../store/current/currentSlice'

// COMPONENTS
import Svg from '../Svg/Svg'
import H3 from '../H3/H3'
import P from '../P/P'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'

export default function Message() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div
            data-testid="modal-expired"
            className="relative mt-4 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all"
        >
            <div className="bg-white px-4 pb-4">
                <div className="">
                    <div className="ml-4 mt-3 flex items-center">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                            <Svg icon="warning" />
                        </div>
                        <H3 className="ml-4">Please select a student</H3>
                    </div>
                    <div className="ml-4 mt-3">
                        <div className="mt-2">
                            <P className="text-sm text-gray-500">
                                You need to select a student before you can
                                start reading books.
                            </P>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end bg-gray-50 px-4 py-3">
                <Button
                    data-testid="modal-message-button"
                    template="primary"
                    className="mr-5"
                    onClick={() => {
                        dispatch(toggleBooksShowMessage())
                        navigate('/dashboard')
                    }}
                >
                    Back to Dashboard
                </Button>
            </div>
        </div>
    )
}
