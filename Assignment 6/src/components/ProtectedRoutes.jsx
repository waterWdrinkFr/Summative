import { Outlet, Navigate } from "react-router-dom";
import { useStoreContext } from "../context/index.jsx";

function ProtectedRoutes() {
    const { LoggedIn } = useStoreContext();

    return (
        LoggedIn ? <Outlet /> : <Navigate to="/login" />
    )
}

export default ProtectedRoutes;