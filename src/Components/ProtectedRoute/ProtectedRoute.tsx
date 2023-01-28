import {Navigate,} from 'react-router-dom'
import {useSelector} from "react-redux";
import {userTokenSelector} from "../../store/user/userSelectors";

type PropTypes = {
    children: JSX.Element
}

export default function ProtectedRoute(props: PropTypes)  {
    const userToken = useSelector(userTokenSelector)
    if (userToken) return props.children;
    return <Navigate to="/" replace />
};