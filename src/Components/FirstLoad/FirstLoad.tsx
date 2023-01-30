import { useQuery } from 'react-query'
import { getUserDetails } from '../../lib/service'
import ls from '../../lib/localStorage'

type PropTypes = {
  children: JSX.Element
}
export default function FirstLoad(props: PropTypes) {
  const token = ls.get()
  /* NOTE:
   * Look inside getUserDetails to see a dispatch to update
   * the store.user
   * */
  const { isLoading, isError } = useQuery(['user', token], getUserDetails, {
    enabled: !!token,
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) {
    ls.remove()
  }

  return props.children
}
