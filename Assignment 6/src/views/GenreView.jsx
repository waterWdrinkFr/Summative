import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useStoreContext } from "../context";
import axios from "axios";

function GenreView() {
    const { genre_id } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const { cart, setCart } = useStoreContext();
    const [page, setPage] = useState(1);
    const totalPages = useRef(1);

    useEffect(() => {
        async function fetchMovies() {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${genre_id}&page=${page}&include_adult=false`
                );
                setMovies(response.data.results);
                totalPages.current = response.data.total_pages || 1;
            } catch (error) {
                console.error("Failed to fetch movies:", error);
                setMovies([]);
            } finally {
                setLoading(false);
            }
        }
        fetchMovies();
    }, [genre_id, page]);

    const handlePageChange = (direction) => {
        const nextPage = page + direction;
        if (nextPage > 0 && nextPage <= totalPages.current) {
            setPage(nextPage);
        }
    };

    const handleAddToCart = (movie) => {
        const updatedCart = new Map(cart || new Map());
        updatedCart.set(movie.id.toString(), {
            id: movie.id,
            title: movie.title,
            poster: movie.poster_path,
        });
        setCart(updatedCart);
    };

    const isInCart = (movieId) => {
        return cart instanceof Map && cart.has(movieId.toString());
    };

    return (
        <div className="mt-[120px]">
            <div className="ml-[70px] grid grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <div key={movie.id} className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
                        <Link to={`/movies/details/${movie.id}`}>
                            {movie.poster_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-[80%] rounded-md mb-2 object-cover"
                                />
                            ) : (
                                <div className="w-full h-[80%] rounded-md mb-2 bg-gray-700 flex items-center justify-center text-gray-300 text-sm italic">
                                    Poster Unavailable
                                </div>
                            )}
                        </Link>
                        <button
                            onClick={() => handleAddToCart(movie)}
                            disabled={isInCart(movie.id)}
                            className={`w-full mt-2 px-6 py-2 text-base font-bold rounded-lg ${isInCart(movie.id)
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-blue-700 hover:bg-blue-800 cursor-pointer"
                                }`}
                        >
                            {isInCart(movie.id) ? "Added to Cart" : "Buy - $$$"}
                        </button>
                    </div>
                ))}
            </div>
            <button
                onClick={() => handlePageChange(-1)}
                disabled={page === 1 || loading}
                className="mt-4 ml-95.5 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 cursor-pointer"
            >
                Previous
            </button>

            <button
                onClick={() => handlePageChange(1)}
                disabled={page === totalPages.current || loading}
                className="mt-2 ml-4 px-8 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
            >
                Next
            </button>
            {loading && <span className="ml-64 text-white">Loading...</span>}
            <span className="ml-64 text-white">Page {page} of {totalPages.current}</span>
        </div>
    );
}

export default GenreView;