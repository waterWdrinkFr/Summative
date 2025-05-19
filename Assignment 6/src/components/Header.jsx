import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context";
import { Map } from "immutable";

function Header() {
    const { name, setName, setLastName, setEmail, setPassword, selectedGenres, setSelectedGenres, setCart, loggedIn, setLoggedIn } = useStoreContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        setName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setSelectedGenres(Map());
        setCart([]);
        setLoggedIn(false);

        navigate("/login");
    };

    return (
        <div className="fixed top-0 left-0 w-full h-[120px] bg-gradient-to-b from-black to-transparent z-20">
            {loggedIn && (
                <div className="text-center w-full bg-blue-900 bg-opacity-75">
                    <p className="text-white font-medium">Hello {name}, welcome to JStreaming!</p>
                </div>
            )}
            
            <div className="flex items-center h-full">
                <button
                    className="mb-5 ml-5 w-[200px] p-1 rounded-lg text-3xl font-bold text-white bg-blue-900 cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    JStreaming
                </button>

                {loggedIn ? (
                    <>
                        <input
                            className="mb-3 ml-[140px] w-[400px] h-[30px] rounded-full border-none px-4 text-base outline-none bg-white text-black"
                            placeholder="Search Title"
                        />
                        <button
                            className="mb-4.5 ml-[50px] h-[35px] w-[90px] rounded-lg text-xs font-bold text-white bg-blue-900 cursor-pointer"
                            onClick={() => navigate(`/movies/genres/${selectedGenres.keys().next().value}`)}
                        >
                            GENRES
                        </button>
                        <button
                            className="mb-4.5 ml-[15px] h-[35px] w-[70px] rounded-lg text-xs font-bold text-white bg-blue-900 cursor-pointer"
                            onClick={() => navigate("/cart")}
                        >
                            CART
                        </button>
                        <button
                            className="mb-4.5 ml-[15px] h-[35px] w-[105px] rounded-lg text-xs font-bold text-white bg-blue-900 cursor-pointer"
                            onClick={() => navigate("/settings")}
                        >
                            SETTINGS
                        </button>
                        <button
                            className="mb-4.5 ml-[20px] h-[35px] w-[90px] rounded-lg text-xs font-bold text-white bg-red-700 cursor-pointer"
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