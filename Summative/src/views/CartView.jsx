import { useStoreContext } from "../context";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function CartView() {
    const { cart, setCart } = useStoreContext();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviePromises = Array.from(cart.keys()).map((id) =>
                    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`)
                );
                const responses = await Promise.all(moviePromises);
                const moviesData = responses.map(res => res.data);
                setMovies(moviesData);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        if (cart.size > 0) {
            fetchMovies();
        } else {
            setMovies([]);
        }
    }, [cart]);

    const handleRemoveFromCart = (id) => {
        const updatedCart = new Map(cart);
        updatedCart.delete(id.toString());
        setCart(updatedCart);
    }

    return (
        <>
            <Header />
            <div className="min-h-screen mt-[150px] p-4 text-white">
                <h1 className="text-4xl font-bold mb-4">Your Cart</h1>
                {movies.length === 0 ? (
                    <p className="text-lg">Your cart is empty.</p>
                ) : (
                    <div className="flex flex-col gap-6">
                        {movies.map((movie) => (
                            <div key={movie.id} className="flex bg-gray-800 rounded-lg shadow-md p-4 text-white">
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    className="w-[130px] h-auto rounded-md mr-4"
                                    alt={movie.title}
                                />
                                <div className="flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                                        <p className="text-sm text-gray-300 mb-2 line-clamp-4">{movie.overview}</p>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveFromCart(movie.id)}
                                        className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white w-fit"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default CartView;