import { useQuery } from 'react-query'
import {useSelector} from "react-redux"

import { getUserDetails } from '../../lib/service'
import ls from '../../lib/localStorage'
import {viewGlobalExpiredSelector} from "../../store/view/viewSelectors"

// COMPONENTS
import Modal from "../Modal/Modal"
import Expired from "../Modal/Expired"

type PropTypes = {
    children: JSX.Element
}
export default function FirstLoad(props: PropTypes) {
    const sessionExpired = useSelector(viewGlobalExpiredSelector)
    const token = ls.get()
    /* NOTE:
     * Look inside getUserDetails to see a dispatch to update
     * the store.user
     * */
    const { isLoading, isError } = useQuery(['user'], getUserDetails, {
        enabled: !!token
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) {
        ls.remove()
    }

    return (
        <>
            { sessionExpired && (
                <Modal className="max-w-md">
                    <Expired />
                </Modal>
            )}
            { props.children }
        </>
    )
}
