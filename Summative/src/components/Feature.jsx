import { useEffect, useState } from "react";
import { useStoreContext } from "../context/context.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
            <div className="mt-12 flex flex-wrap justify-center gap-18">
                {movies.map((movie) => (
                    <Link to={`/movies/details/${movie.id}`} key={movie.id}>
                        <img
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-[450px] rounded-md mb-2 object-cover"
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Feature;