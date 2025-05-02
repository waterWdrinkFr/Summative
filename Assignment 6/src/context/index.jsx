import { createContext, useContext, useState } from "react";
import { Map } from "immutable";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [cart, setCart] = useState(Map());
    const [genres, setGenres] = useState(Map());


    return (
        <StoreContext.Provider value={{ email, setEmail, cart, setCart, genres, setGenres }}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStoreContext = () => {
    return useContext(StoreContext);
}