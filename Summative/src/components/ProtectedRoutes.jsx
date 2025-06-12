import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, firestore } from "../firebase/firebase.jsx";
import { doc, getDoc } from "firebase/firestore";

function ProtectedRoutes() {
    const [isRegistered, setIsRegistered] = useState(null);

    useEffect(() => {
        const checkUserID = async () => {
            const user = auth.currentUser;
            if (!user) {
                setIsRegistered(false);
                return;
            }
            const userDocRef = doc(firestore, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);
            setIsRegistered(userDocSnap.exists());
            console.log("User ID check:", user.uid, "Registered:", userDocSnap.exists());
        };
        checkUserID();
    }, []);

    if (isRegistered === null) {
        return null;
    }

    return isRegistered ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
