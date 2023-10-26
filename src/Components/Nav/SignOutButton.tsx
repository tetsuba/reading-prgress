import Button from '../Button/Button'
import { resetUserToInitialState } from '../../store/user/userSlice'
import ls from '../../lib/localStorage'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetCurrentToInitialState } from '../../store/current/currentSlice'
import { TailwindTemplateTypes } from '../Button/buttonClasses.tailwind'

type PropTypes = {
    template: TailwindTemplateTypes
}

export default function SignOutButton(props: PropTypes) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <Button
            {...props}
            onClick={() => {
                dispatch(resetUserToInitialState())
                dispatch(resetCurrentToInitialState())
                ls.remove()
                navigate('/')
            }}
        >
            Sign out
        </Button>
    )
}
