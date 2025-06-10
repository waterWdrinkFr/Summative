import { createContext, useContext, useState } from "react";
import { Map } from "immutable";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cart, setCart] = useState(new Map());
    const [selectedGenres, setSelectedGenres] = useState(Map());
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
        <StoreContext.Provider value={{ name, setName, lastName, setLastName, email, setEmail, password, setPassword, cart, setCart, selectedGenres, setSelectedGenres }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStoreContext = () => {
    return useContext(StoreContext);
};