import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Feature() {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
        }
        return array;
    }

    useEffect(() => {
        (async function getMovies() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
            );
            setMovies(shuffle(response.data.results).slice(0, 3));
        })();
    }, []);

    return (
        <div className="p-15">
            <h2 className="text-2xl font-bold text-center text-white mt-[9%]">Now Playing</h2>
            <div className="flex flex-wrap justify-center gap-18">
                {movies.map((movie) => (
                    <div key={movie.id} className="mt-[1%] w-[25%] h-[500px] bg-blue-800 text-white rounded-lg overflow-hidden shadow-lg">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="w-full h-[92.5%] object-cover" />
                        <div className="flex items-center justify-center h-[7.5%]">
                            <span 
                                className="hover:underline cursor-pointer text-white font-bold"
                                onClick={() => navigate(`/movies/details/${movie.id}`)}
                            >
                                {movie.title}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Feature;