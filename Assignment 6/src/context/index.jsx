import { createContext, useContext, useState } from "react";
import { Map } from "immutable";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [availableGenres, setAvailableGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState(new Map());
    const [cart, setCart] = useState(new Map());


    return (
        <StoreContext.Provider value={{ name, setName, lastName, setLastName, email, setEmail, password, setPassword, availableGenres, setAvailableGenres, selectedGenres, setSelectedGenres, cart, setCart }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStoreContext = () => {
    return useContext(StoreContext);
};