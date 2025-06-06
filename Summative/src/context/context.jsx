import { createContext, useContext, useState } from "react";
import { Map } from "immutable";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cart, setCart] = useState(new Map());
    const [selectedGenres, setSelectedGenres] = useState(Map());
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <StoreContext.Provider value={{ name, setName, lastName, setLastName, email, setEmail, password, setPassword, cart, setCart, selectedGenres, setSelectedGenres, loggedIn, setLoggedIn }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStoreContext = () => {
    return useContext(StoreContext);
};