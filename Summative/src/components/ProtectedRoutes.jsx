import { Outlet, Navigate } from "react-router-dom";
import { useStoreContext } from "../context/context.jsx";

function ProtectedRoutes() {
    const { user } = useStoreContext();

    return (
        user ? <Outlet /> : <Navigate to="/login" />
    )
}

export default ProtectedRoutes;
