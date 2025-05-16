import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useStoreContext } from "../context";
import { Map } from "immutable";

function DetailView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const { cart, setCart, loggedIn } = useStoreContext();

    useEffect(() => {
        async function fetchDetails() {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&append_to_response=videos&include_adult=false`
                );
                setMovie(response.data);
            } catch (error) {
                navigate("/*");
            }
        }
        fetchDetails();
    }, [id]);

    const handleAddToCart = () => {
        const updatedCart = cart.set(movie.id.toString(), {
            id: movie.id,
            title: movie.title,
            poster: movie.poster_path,
        });
        
        setCart(updatedCart);
        alert(`"${movie.title}" has been added to your cart!`);
    };

    if (!movie) {
        return <div className="text-center mt-4">Loading...</div>;
    }

    const trailer = movie.videos.results.find((video) => video.type === "Trailer" && video.site === "YouTube");
    const isInCart = cart.has(movie.id.toString());

    return (
        <div className="mt-[100px] p-4 text-white">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                className="w-[250px] h-full rounded-md mb-2"
            />
            <p className="text-lg mb-2"><strong>Rating:</strong> {movie.vote_average.toFixed(1)}/10</p>
            <p className="text-lg mb-2"><strong>Overview:</strong> {movie.overview}</p>
            <p className="text-lg mb-2"><strong>Runtime:</strong> {movie.runtime} minutes</p>
            <p className="text-lg mb-2"><strong>Original Language:</strong> {movie.original_language.toUpperCase()}</p>
            <p className="text-lg mb-2"><strong>Status:</strong> {movie.status.toLocaleString()}</p>
            <p className="text-lg mb-2"><strong>Release Date:</strong> {movie.release_date}</p>
            <p className="text-lg mb-2"><strong>Revenue:</strong> ${movie.revenue.toLocaleString()}</p>
            
            <div className="mt-6 mb-4">
                <button 
                    onClick={handleAddToCart}
                    disabled={isInCart}
                    className={`px-6 py-3 rounded-lg text-white font-bold ${
                        isInCart 
                            ? "bg-gray-500 cursor-not-allowed" 
                            : "bg-blue-600 hover:bg-blue-800"
                    }`}
                >
                    {isInCart ? "Added to Cart" : `Buy ${movie.title}`}
                </button>
            </div>
            
            {trailer ? (
                <div className="mt-4 mb-18">
                    <h2 className="text-2xl font-bold mb-2">Trailer</h2>
                    <iframe
                        width="950"
                        height="400"
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