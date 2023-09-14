import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'

import ls from '../../lib/localStorage'
import { viewGlobalExpiredSelector } from '../../store/view/viewSelectors'

// COMPONENTS
import Modal from '../Modal/Modal'
import Expired from '../Modal/Expired'
import Loading from '../Loading/Loading'
import { getUserDetails } from '../../api/user'
import { updateUser } from '../../store/user/userSlice'

type PropTypes = {
    children: JSX.Element
}
export default function FirstLoad(props: PropTypes) {
    const dispatch = useDispatch()
    const sessionExpired = useSelector(viewGlobalExpiredSelector)
    const token = ls.get()
    /* NOTE:
     * Look inside getUserDetails to see a dispatch to update
     * the store.user
     * */
    const { isLoading, isError, isSuccess, data } = useQuery(
        ['user'],
        getUserDetails,
        {
            retry: false,
            enabled: !!token && !sessionExpired
        }
    )

    if (isLoading) return <Loading />
    if (isError) ls.remove()
    if (isSuccess) dispatch(updateUser({ data: data.data, token }))

    return (
        <>
            {sessionExpired && (
                <Modal className="max-w-md">
                    <Expired />
                </Modal>
            )}
            {props.children}
        </>
    )
}
