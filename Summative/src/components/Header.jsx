import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context/context.jsx";
import { Map } from "immutable";
import { useState, useCallback, useRef } from "react";
import { auth, firestore } from "../firebase/firebase.jsx";

function Header() {
    const { name, setName, setLastName, setEmail, setPassword, selectedGenres, setSelectedGenres, setCart } = useStoreContext();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const debounceTimer = useRef(null);
    const [results, setResults] = useState([]);
    
    const handleSearchChange = useCallback((e) => {
        const value = e.target.value;
        setQuery(value);
        clearTimeout(debounceTimer.current);

        debounceTimer.current = setTimeout(() => {
            if (value.trim()) {
                fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&query=${encodeURIComponent(value)}&include_adult=false`)
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.results) {
                            setResults(data.results.slice(0, 5));
                        }
                    })
                    .catch((err) => {
                        console.error("Search failed:", err);
                        setResults([]);
                    });
            } else {
                setResults([]);
            }
        }, 500);
    }, []);

    const handleSelectMovie = (movieId) => {
        setQuery("");
        setResults([]);
        navigate(`/movies/details/${movieId}`);
    };

    const handleLogout = () => {
        setName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setSelectedGenres(Map());
        setCart([]);
        navigate("/login");
    };

    return (
        <div className="fixed top-0 left-0 w-full h-[120px] bg-gradient-to-b from-black to-transparent z-20">
            {selectedGenres.size > 0 && (
                <div className="text-center w-full bg-blue-900 bg-opacity-75">
                    <p className="text-white font-medium">Hello {auth.currentUser.displayName.trim().split(" ")[0]}, welcome to JStreaming!</p>
                </div>
            )}
            <div className="flex items-center h-full">
                <button
                    className="mb-5 ml-5 w-[200px] p-1 rounded-lg text-3xl font-bold text-white bg-blue-900 cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    JStreaming
                </button>
                {selectedGenres.size > 0 ? (
                    <>
                        <div className="relative mb-2.5 ml-[140px]">
                            <input
                                className="w-[400px] h-[30px] rounded-full border-none px-4 text-base outline-none bg-white text-black"
                                placeholder="Search Title"
                                value={query}
                                onChange={handleSearchChange}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && query.trim()) {
                                        navigate(`/movies/search/${encodeURIComponent(query.trim())}`);
                                        setResults([]);
                                    }

                                }}
                            />
                            {results.length > 0 && (
                                <ul className="absolute top-[35px] w-full bg-white rounded-lg shadow-lg z-50">
                                    {results.map((movie) => (
                                        <li
                                            key={movie.id}
                                            onClick={() => handleSelectMovie(movie.id)}
                                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-black"
                                        >
                                            {movie.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <button
                            className="mb-3 ml-[75px] h-[35px] w-[90px] rounded-lg text-xs font-bold text-white bg-blue-900 cursor-pointer"
                            onClick={() => navigate(`/movies/genres/${selectedGenres.keys().next().value}`)}
                        >
                            GENRES
                        </button>
                        <button
                            className="mb-3 ml-[15px] h-[35px] w-[70px] rounded-lg text-xs font-bold text-white bg-blue-900 cursor-pointer"
                            onClick={() => navigate("/cart")}
                        >
                            CART
                        </button>
                        <button
                            className="mb-3 ml-[15px] h-[35px] w-[105px] rounded-lg text-xs font-bold text-white bg-blue-900 cursor-pointer"
                            onClick={() => navigate("/settings")}
                        >
                            SETTINGS
                        </button>
                        <button
                            className="mb-3 ml-[20px] h-[35px] w-[90px] rounded-lg text-xs font-bold text-white bg-red-700 cursor-pointer"
                            onClick={handleLogout}
                        >
                            LOGOUT
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="mt-0.5 ml-[65%] h-[35px] w-[70px] rounded-lg text-xs font-bold text-white bg-blue-900 cursor-pointer"
                            onClick={() => navigate("/login")}
                        >
                            LOGIN
                        </button>
                        <button
                            className="mt-0.5 ml-5 h-[35px] w-[90px] rounded-lg text-xs font-bold text-white bg-blue-900 cursor-pointer"
                            onClick={() => navigate("/register")}
                        >
                            REGISTER
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;