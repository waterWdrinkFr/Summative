import React from "react";
import { Navigate } from "react-router-dom";
import { useStoreContext } from "../context";

function ProtectedRoutes({ children }) {
    const { genres: selectedGenres } = useStoreContext();

    if (selectedGenres.size === 0) {
        return <Navigate to="/register" replace />;
    }

    return children;
}

export default ProtectedRoutes;