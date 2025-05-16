import React from "react";
import { Navigate } from "react-router-dom";
import { useStoreContext } from "../context";

function ProtectedRoutes({ children }) {
    const { isLoggedIn } = useStoreContext();

    if (isLoggedIn === false) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoutes;