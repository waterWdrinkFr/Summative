import { Outlet, Navigate } from "react-router-dom";
import { useStoreContext } from "../context/context.jsx";

function ProtectedRoutes() {
    const { loggedIn } = useStoreContext();

    return (
        loggedIn ? <Outlet /> : <Navigate to="/login" />
    )
}

export default ProtectedRoutes;
