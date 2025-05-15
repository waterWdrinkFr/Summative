import { createContext, useContext, useState } from "react";
import { Map } from "immutable";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cart, setCart] = useState(Map());
    const [genres, setGenres] = useState(Map());

    return (
        <StoreContext.Provider value={{ name, setName, lastName, setLastName, email, setEmail, password, setPassword, cart, setCart, genres, setGenres }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStoreContext = () => {
    return useContext(StoreContext);
};