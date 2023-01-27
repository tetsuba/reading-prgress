import {
    Routes,
    Route,
    NavLink,
    Navigate,
    useNavigate,
} from 'react-router-dom';
import {useQuery} from "react-query"
import ls from "../../lib/localStorage"

type PropTypes = {
    children: JSX.Element
}

export default function ProtectedRoute(props: PropTypes)  {
    const token = ls.get()
    // const res = useQuery()

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return props.children;
};