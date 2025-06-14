import { createContext, useState, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase.jsx";
import { Map } from 'immutable';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [cart, setCart] = useState(Map());
    const [purchases, setPurchases] = useState(Map());
    const [loading, setLoading] = useState(true);

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
                    if (await getDoc(docRef).exists()) {
                        const data = docSnap.data();
                        setSelectedGenres(data.genres);
                        setPurchases(Map(data.purchases));
                    } else {
                        setSelectedGenres([]);
                        setPurchases(Map());
                    }
                } catch (error) {
                    console.log("Error fetching genres:", error);
                }
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div>
                <h1 className="loading-title">Loading...</h1>
            </div>
        )
    }

    return (
        <StoreContext.Provider value={{ user, setUser, selectedGenres, setSelectedGenres, cart, setCart, purchases, setPurchases }}>
            {children}
        </StoreContext.Provider>
    );
}

export const useStoreContext = () => {
    return useContext(StoreContext);
}