import { createContext, useState, useContext, useEffect } from "react";
import { Map } from 'immutable';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase.jsx";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [selectedGenres, setSelectedGenres] = useState(Map());
    const [cart, setCart] = useState(Map());
    const [purchases, setPurchases] = useState(Map());

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                const sessionCart = localStorage.getItem(user.uid);
                if (sessionCart) {
                    setCart(Map(JSON.parse(sessionCart)));
                }

                const docRef = doc(firestore, "users", user.uid);
                try {
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const fetchedGenres = docSnap.data().genres;
                        setGenres(fetchedGenres);
                        const fetchedPurchases = Map(docSnap.data().purchases);
                        setPurchases(fetchedPurchases);
                    } else {
                        setGenres([]);
                        setPurchases(Map());
                    }
                } catch (error) {
                    console.log("Error fetching genres:", error);
                }
            }
        });
    }, []);

    return (
        <StoreContext.Provider value={{ cart, setCart, selectedGenres, setSelectedGenres, user, setUser, purchases, setPurchases }}>
            {children}
        </StoreContext.Provider>
    );
}

export const useStoreContext = () => {
    return useContext(StoreContext);
}