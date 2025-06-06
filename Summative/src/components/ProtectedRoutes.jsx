import { Outlet, Navigate } from "react-router-dom";
import { useStoreContext } from "../context/context.jsx";

function ProtectedRoutes() {
    const { selectedGenres } = useStoreContext();

    return (
        selectedGenres.size > 0 ? <Outlet /> : <Navigate to="/login" />
    )
}

export default ProtectedRoutes;
