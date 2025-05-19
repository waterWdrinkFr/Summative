import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useStoreContext } from "../context";
import axios from "axios";

function GenreView() {
    const { genre_id } = useParams();
    const [movies, setMovies] = useState([]);
    const { cart, setCart } = useStoreContext();
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function fetchMovies() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${genre_id}&page=${page}&include_adult=false`
            );
            setMovies(response.data.results);
        }
        fetchMovies();
    }, [genre_id, page]);

    const handleAddToCart = (movie) => {
        const updatedCart = new Map(cart || new Map());
        updatedCart.set(movie.id.toString(), {
            id: movie.id,
            title: movie.title,
            poster: movie.poster_path,
        });
        setCart(updatedCart);
    };

    // Check if movie is in cart safely
    const isInCart = (movieId) => {
        return cart instanceof Map && cart.has(movieId.toString());
    };

    return (
        <div className="mt-[120px]">
            <div className="ml-[70px] grid grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <div key={movie.id} className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
                        <Link to={`/movies/details/${movie.id}`}>
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                className="w-full h-[80%] rounded-md mb-2"
                            />
                        </Link>
                        <button
                            onClick={() => handleAddToCart(movie)}
                            disabled={isInCart(movie.id)}
                            className={`w-full mt-2 px-6 py-2 text-base font-bold rounded-lg ${
                                isInCart(movie.id)
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-blue-700 hover:bg-blue-800 cursor-pointer"
                            }`}
                        >
                            {isInCart(movie.id) ? "Added to Cart" : "Buy - $$$"}
                        </button>
                    </div>
                ))}
            </div>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}
                className="mt-4 ml-95.5 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 cursor-pointer" >
                Previous
            </button>
            <button onClick={() => setPage(page + 1)}
                className="mt-2 ml-4 px-8 py-2 bg-blue-600 text-white rounded-lg cursor-pointer" >
                Next
            </button>
            <span className="ml-64 text-white">Page {page}</span>
        </div>
    );
}

export default GenreView;