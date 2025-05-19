import { Outlet, Navigate } from "react-router-dom";
import { useStoreContext } from "../context/index.jsx";

function ProtectedRoutes() {
    const { setLoggedIn } = useStoreContext();

    return (
        setLoggedIn ? <Outlet /> : <Navigate to="/login" />
    )
}

export default ProtectedRoutes;