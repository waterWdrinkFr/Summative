import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useStoreContext } from "../context";

function DetailView() {
    const [movies, setMovies] = useState(null);
    const { cart, setCart } = useStoreContext();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchDetails() {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&append_to_response=videos&include_adult=false`
                );
                setMovies(response.data);
            } catch (error) {
                navigate("/*");
            }
        }
        fetchDetails();
    }, [id]);

    const handleAddToCart = (movie) => {
        const updatedCart = new Map(cart);
        updatedCart.set(movie.id.toString(), {
            id: movie.id,
            title: movie.title,
            poster: movie.poster_path,
        });
        setCart(updatedCart);
    };

    if (!movies) {
        return <div className="text-center mt-4">Loading...</div>;
    }

    const trailer = movies.videos.results.find((video) => video.type === "Trailer" && video.site === "YouTube");

    return (
        <div className="mt-[100px] p-4 text-white">
            <h1 className="text-4xl font-bold mb-4">{movies.title}</h1>
            {movies.poster_path ? (
                <img
                    src={`https://image.tmdb.org/t/p/w200${movies.poster_path}`}
                    alt={movies.title}
                    className="w-[250px] h-[80%] rounded-md mb-2 object-cover"
                />
            ) : (
                <div className="w-full h-[80%] rounded-md mb-2 bg-gray-700 flex items-center justify-center text-gray-300 text-sm italic">
                    Poster Unavailable
                </div>
            )}
            <p className="text-lg mb-2"><strong>Rating:</strong> {movies.vote_average.toFixed(1)}/10</p>
            <p className="text-lg mb-2"><strong>Overview:</strong> {movies.overview}</p>
            <p className="text-lg mb-2"><strong>Runtime:</strong> {movies.runtime} minutes</p>
            <p className="text-lg mb-2"><strong>Original Language:</strong> {movies.original_language.toUpperCase()}</p>
            <p className="text-lg mb-2"><strong>Status:</strong> {movies.status.toLocaleString()}</p>
            <p className="text-lg mb-2"><strong>Release Date:</strong> {movies.release_date}</p>
            <p className="text-lg mb-2"><strong>Revenue:</strong> ${movies.revenue.toLocaleString()}</p>

            <div className="mt-6 mb-4">
                <button
                    onClick={() => handleAddToCart(movies)}
                    disabled={cart?.has(movies.id.toString())}
                    className={`w-[175px] mt-2 px-6 py-2 text-base font-bold rounded-lg ${cart?.has?.(movies.id.toString())
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-blue-700 hover:bg-blue-800 cursor-pointer"
                        }`}
                >
                    {cart?.has(movies.id.toString()) ? "Added to Cart" : "Buy - $$$"}
                </button>
            </div>

            {trailer ? (
                <div className="mt-4 mb-18">
                    <h2 className="text-2xl font-bold mb-2">Trailer</h2>
                    <iframe
                        width="950"
                        height="500"
                        src={`https://www.youtube.com/embed/${trailer.key}`} title="Movie Trailer" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
                    </iframe>
                </div>
            ) : (
                <p className="text-lg mt-4">No trailer available.</p>
            )}
        </div>
    );
}

export default DetailView;