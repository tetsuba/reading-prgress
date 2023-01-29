import { useQuery } from 'react-query'
import { getUserDetails } from '../../lib/service'
import ls from '../../lib/localStorage'
import { useNavigate } from 'react-router-dom'

type PropTypes = {
  children: JSX.Element
}
export default function FirstLoad(props: PropTypes) {
  const token = ls.get()
  const navigate = useNavigate()
  /* NOTE:
   * Look inside getUserDetails to see a dispatch to update
   * the store.user
   * */
  const { isLoading, isError } = useQuery(['user', token], getUserDetails, {
    enabled: !!token,
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) navigate('/')
  return props.children
}
