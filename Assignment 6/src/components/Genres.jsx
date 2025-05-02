import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Genres(props) {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(props.defaultGenre || 28);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_KEY}`
                );
                setGenres(
                    response.data.genres.filter((genre) =>
                        [28, 12, 16, 80, 10751, 14, 36, 27, 9648, 878, 10752, 37].includes(genre.id)
                    )
                );
            } catch (error) {
                navigate("/*");
            }
        };

        fetchGenres();
    }, []);

    const GenreClick = (genreId) => {
        setSelectedGenre(genreId);
        navigate(`/movies/${genreId}`);
        if (props.onGenreSelect) {
            props.onGenreSelect(genreId);
        }
    };

    return (
        <div>
            <ul className="list-none pl-0">
                {genres.map((genre) => (
                    <li key={genre.id} className="mb-3">
                        <button
                            className={`px-4 py-2 text-xl font-bold cursor-pointer whitespace-nowrap ${
                                selectedGenre === genre.id ? "underline text-sky-600" : "text-white"
                            }`}
                            onClick={() => GenreClick(genre.id)}
                        >
                            {genre.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Genres;