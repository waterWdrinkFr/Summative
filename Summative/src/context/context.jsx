import { createContext, useContext, useState } from "react";
import { Map } from "immutable";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [selectedGenres, setSelectedGenres] = useState(Map());
    const [loggedIn, setLoggedIn] = useState(false);

    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => { 
    //         if (user) {
    //             setUser(user);
    //             console.log("Have a user");
    //         } else {
    //             setUser(null);
    //             console.log("Do not have a user");
    //         }
    //         setLoading(false);
    //     });
    // }, []);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <StoreContext.Provider value={{ cart, setCart, selectedGenres, setSelectedGenres, user, setUser, purchases, setPurchases }}>
            {children}
        </StoreContext.Provider>
    );
}

export const useStoreContext = () => {
    return useContext(StoreContext);
}